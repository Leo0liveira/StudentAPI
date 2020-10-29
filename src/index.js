
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./Database')

const app = express()
const port = 8080

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Student API')
})

app.listen(port, () => {
  console.log(`Student API rodando em: http://localhost:${port}`)
})

app.get('/alunos', () => {
  // TODO
})

app.post('/alunos', (req, res) => {
  const date = new Date()

  const data = {
    nome: req.body.nome,
    rga: req.body.rga,
    curso: req.body.curso,
    situacao: req.body.situacao,
    datetime: `${date.toLocaleString()}`
  }

  const regularRGA = RegExp('^[0-9]{4}.[0-9]{4}.[0-9]{3}-[0-9]{1}$')

  if (!regularRGA.test(data.rga)) {
    res.status(400).json({ error: 'RGA inválido.' })
    return
  }

  if (data.situacao !== 'Inativo') {
    data.situacao = 'Ativo'
  }

  const query = 'INSERT INTO aluno (rga, nome, curso, situacao, registrado_em) VALUES (?, ? ,? ,? , ?)'
  const params = [data.rga, data.nome, data.curso, data.situacao, data.datetime]

  db.run(query, params, function (err) {
    if (err) {
      res.status(400).json({
        error: 'Falha ao inserir dados',
        message: err.message
      })
      return
    }
    res.status(201).json({
      message: 'Sucesso.',
      id: this.lastID,
      rga: data.rga,
      nome: data.nome,
      curso: data.curso,
      situacao: data.situacao,
      registrado_em: data.datetime
    })
  })
})

app.get('/alunos/id', () => {
  // TODO
})

app.put('/alunos/id', () => {
  // TODO
})

app.delete('/alunos/id', () => {
  // TODO
})

app.get('/alunos', () => {
  // TODO
})
