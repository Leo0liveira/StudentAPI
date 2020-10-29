const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('students-db.sqlite', (err) => {
  if (err) {
    // Não foi possível conectar ao banco de dados
    console.error(err.message)
    throw err
  } else {
    console.log('Conectado ao banco de dados')
    db.run(`
            CREATE TABLE IF NOT EXISTS aluno (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                rga TEXT UNIQUE,
                nome TEXT NOT NULL, 
                curso TEXT,
                situacao TEXT DEFAULT 'Ativo',
                registrado_em TEXT
            )`
    )
  }
})
module.exports = db
