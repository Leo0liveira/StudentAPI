const sqlite3 = require('sqlite3')

let db = new sqlite3.Database('students-db', (err) => {
    if (err) {
        //Não foi possível conectar ao banco de dados
        console.error(err.message)
        throw err
    }
    else {
        console.log("Conectado ao banco de dados")
        db.run(`
            CREATE TABLE student (
                rga TEXT PRIMARY KEY,
                nome TEXT NOT NULL, 
                curso TEXT
            )`,
        )
    }
})

module.exports = db