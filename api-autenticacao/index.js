const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(cors())

app.use(bodyParser.json()) // Interpretar o JSON no corpo das requisições
app.use('/api', authRoutes) // Usar as rotas de autenticação

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})