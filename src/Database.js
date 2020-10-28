const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('students-db', (err) => {
  if (err) {
    // Não foi possível conectar ao banco de dados
    console.error(err.message)
    throw err
  } else {
    console.log('Conectado ao banco de dados')
    db.run(`
            CREATE TABLE student (
                id TEXT PRIMARY KEY,
                rga TEXT UNIQUE,
                nome TEXT NOT NULL, 
                curso TEXT,
                situacao TEXT DEFAULT 'ativo',
                registrado_em DATETIME
            )`
    )
  }
})
module.exports = db
