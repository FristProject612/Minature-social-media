const express = require('express');
const app = express();

app.get('/api', (request, response) => {
  response.json({"users": [
    {data:'Hello1', id: 1},
    {data:'Hello2', id: 2},
    {data:'Hello3', id: 3},
    {data:'Hello4', id: 4}]
  })
})

const link = 'http://localhost:5000/api';
app.listen(5000, () => {
  console.log(`It's working\nGo on ${link}`)
})
