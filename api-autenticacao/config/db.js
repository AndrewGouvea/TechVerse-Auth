const mysql = require('mysql2')

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message)
        process.exit(1)
    }
    console.log('Conectado ao banco de dados.')
})


module.exports = db