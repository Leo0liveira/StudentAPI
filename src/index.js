const express = require('express')
const bodyParser = require('body-parser')
const db = require('./Database')
const app = express()
const port = 8000

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Student API')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/alunos', () => {
  // TODO
})

app.post('/alunos', (req, res) => {

  // RGA: OK
  // Nome: OK
  // Curso: OK
  // Situacao: DEFAULT QUEBRADO
  // ID: OK
  // REGISTRADO_EM: NÃO APARECE

  var data = {
    nome: req.body.nome,
    rga: req.body.rga,
    curso: req.body.curso,
    situacao: req.body.situacao
  }

  var regularRGA = RegExp('[0-9]{4}.[0-9]{4}.[0-9]{3}-[0-9]{1}')

  if (!regularRGA.test(data.rga)) {
    res.status(400).json({ error: 'RGA inválido.' })
    return
  }

  if (data.situacao !== 'Ativo' || data.situacao !== 'Inativo') {
    data.situacao = ''
  }

  var query = 'INSERT INTO aluno (rga, nome, curso, situacao, registrado_em) VALUES (?, ? ,? ,? , Datetime(\'now\',\'localtime\'))'
  var params = [data.rga, data.nome, data.curso, data.situacao]

  db.run(query, params, function (err) {
    if (err) {
      res.status(400).json({
        error: 'Falha ao inserir dados',
        message: err.message
      })
      return
    }
    res.json(
      {
        message: 'Sucesso.',
        id: this.lastID,
        rga: data.rga,
        nome: data.nome,
        curso: data.curso,
        situacao: data.situacao
        // TO DO: RETORNAR A DATA DE INSERÇÂO
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
