const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json());

const pg = require('pg');
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const PORT = process.env.PORT || 3000;

app.post('/clicks', async function(request, response) {
  console.log(request.body);
  const result = await db.query(`
      INSERT INTO clicks (pagex, pagey, trackingid, textclicked, timeonpage, userid)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;`, [request.body.pageX, request.body.pageY, request.body.trackingId, request.body.textClicked, request.body.timeOnPage, request.body.userId]
      );
  response.json(result.rows[0]);
  response.status(406).json({ error: 'click NOT tracked' });
});

db.query(`
  CREATE TABLE IF NOT EXISTS clicks(
    id SERIAL PRIMARY KEY,
    userId VARCHAR(128) NOT NULL,
    trackingId VARCHAR(128) NOT NULL,
    pageX INTEGER NOT NULL,
    pageY INTEGER NOT NULL,
    textClicked VARCHAR(128),
    timeOnPage INTEGER NOT NULL
  );
`);

app.listen(PORT, () => console.log(`Server liftoff at port ${PORT} 🚀`));
