const db = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { addToBlacklist } = require('../utils/blacklist')

// Registrar um usuário
exports.register = (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ error: 'Preencha todos os campos.' })
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)'
    db.query(sql, [email, hashedPassword], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao registrar usuário. '})
        }
        res.status(201).json({ message: 'Usuário registrado com sucesso.' })
    })
}

// Login do usuário
exports.login = (req, res) => {
const { email, password } = req.body

if (!email || !password) {
    return res.status(400).json({ error: 'Preencha todos os campos.' })
}

const sql = 'SELECT * FROM users WHERE email = ?'
db.query(sql, [email], (err, results) => {
    if(err || results.length === 0) {
        return res.status(401).json({ error: 'Credenciais inválidas. '})
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if(!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciais inválidas. '})
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
    res.json({ user: {id: user.id, email: user.email }, token})
    })
}

// Buscar dados do usuário autenticado
exports.getUserData = (req, res) => {
    res.json({ user: req.user })
}

// Logout do usuário
exports.logout = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    addToBlacklist(token);
    res.json({ message: 'Logout realizado com sucesso.' })
}
