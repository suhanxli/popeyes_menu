const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json());

const pg = require('pg');
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const PORT = process.env.PORT || 3000;

app.post('/clicks', async function(request, response) {
  const {body} = request.body;
  console.log([body.pageX, body.pageY, body.trackingId, body.textClicked, body.timeOnPage, body.userId]);
  const result = await db.query(`
      INSERT INTO clicks (pagex, pagey, trackingid, textclicked, timeonpage, userid)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;`, [body.pageX, body.pageY, body.trackingId, body.textClicked, body.timeOnPage, body.userId]
      );
  response.json(result.rows[0]);
});

db.query(`
  CREATE TABLE IF NOT EXISTS clicks(
    id SERIAL PRIMARY KEY,
    userId VARCHAR(128) NOT NULL,
    trackingId VARCHAR(128) NOT NULL,
    pageX INTEGER NOT NULL,
    pageY INTEGER NOT NULL,
    textClicked VARCHAR(512),
    timeOnPage INTEGER NOT NULL
  );
`);

app.listen(PORT, () => console.log(`Server liftoff at port ${PORT} 🚀`));
