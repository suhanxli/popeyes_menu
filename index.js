const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/clicks', async function(request, response) {
  console.log(request.body);
  if (response.ok) {
    response.json({click:'tracked'});
  }
});


app.listen(PORT, () => console.log(`Server liftoff at port ${PORT} 🚀`));
