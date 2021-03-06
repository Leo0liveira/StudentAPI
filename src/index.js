const express = require('express')
const db = require('./Database')
const bodyParser = require('body-parser')
const app = express()
const port = 8080

app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`Student API rodando em: http://localhost:${port}`)
})

app.get('/alunos', (req, res) => {
  var limite = req.query.limite
  var pagina = req.query.pagina
  var nome = req.query.nome

  var qlimit = ''
  var qpage = ''
  var qname = ''

  if (limite) {
    qlimit = ' LIMIT ' + limite
  }
  if (pagina & limite) {
    qpage = ' OFFSET ' + limite * (pagina - 1)
  }
  if (nome) {
    qname = ` WHERE nome LIKE '%${nome}%'`
  }

  var query = 'SELECT * FROM aluno' + qlimit + qpage + qname

  db.all(query, (err, alunos) => {
    if (err) {
      res.status(400).json({
        message: 'Erro ao recuperar alunos',
        error: err.message
      })
      return
    }

    res.status(200).json({
      message: 'Sucesso',
      data: alunos
    })
  })
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

  const regexRGA = RegExp('^[0-9]{4}.[0-9]{4}.[0-9]{3}-[0-9]{1}$')

  if (!regexRGA.test(data.rga)) {
    res.status(400).json({ error: 'RGA inválido.' })
    return
  }

  if (data.situacao !== 'Inativo') {
    data.situacao = 'Ativo'
  }

  const query =
    'INSERT INTO aluno (rga, nome, curso, situacao, registrado_em) VALUES (?, ? ,? ,? , ?)'
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

app.put('/alunos', (req, res) => {
  res.status(405).json({
    message: 'Método não permitido.'
  })
})

app.delete('/alunos', (req, res) => {
  res.status(405).json({
    message: 'Método não permitido.'
  })
})

app.get('/alunos/:id?', (req, res) => {
  var alunoId = req.params.id

  var query = 'SELECT * FROM aluno WHERE id =' + alunoId

  db.get(query, (err, aluno) => {
    if (err) {
      res.status(404).json({
        message: 'Aluno não encontrado.',
        error: err.message
      })
      return
    }

    res.status(200).json({
      message: 'Sucesso',
      data: aluno
    })
  })
})

app.post('/alunos/id', (req, res) => {
  res.status(405).json({
    message: 'Método não permitido.'
  })
})

app.put('/alunos/:id?', (req, res) => {
  const date = new Date()

  var alunoId = req.params.id

  const data = {
    nome: req.body.nome,
    rga: req.body.rga,
    curso: req.body.curso,
    situacao: req.body.situacao,
    datetime: `${date.toLocaleString()}`
  }
  var query =
    'UPDATE aluno SET nome = ?, rga = ?, curso = ?, situacao = ?, registrado_em = ? WHERE id = ' +
    alunoId
  var params = [data.nome, data.rga, data.curso, data.situacao, data.datetime]

  db.run(query, params, (err) => {
    if (err) {
      res.status(404).json({
        message: 'Aluno não encontrado.',
        erro: err.message
      })
      return
    }
    res.status(200).json({
      message: 'Sucesso',
      data: data
    })
  })
})

app.delete('/alunos/:id?', (req, res) => {
  var alunoId = req.params.id
  var query = 'DELETE FROM aluno WHERE id = ' + alunoId

  db.get('SELECT * FROM aluno WHERE id = ?', alunoId, (err, aluno) => {
    if (err) {
      res.status(404).json({
        message: 'Aluno não encontrado.',
        erro: err.message
      })
      return
    }
    db.run(query, (err) => {
      if (err) {
        res.status(404).json({
          message: 'Aluno não encontrado.',
          erro: err.message
        })
      }
      res.status(200).json({
        message: 'Sucesso.',
        data: aluno
      })
    })
  })
})
