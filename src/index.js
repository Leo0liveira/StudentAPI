const express = require('express')
const app = express()
const port = 8000
const routes = require('./routes')

app.get('/', (req, res) => {
  res.send('Student API')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/alunos', () => {
  //TODO
})

app.post('/alunos', () => {
  //TODO
})

app.get('/alunos/id', () => {
  //TODO
})

app.put('/alunos/id', () => {
  //TODO
})

app.delete('/alunos/id', () => {
  //TODO
})

app.get('/alunos', () => {
  //TODO
})
