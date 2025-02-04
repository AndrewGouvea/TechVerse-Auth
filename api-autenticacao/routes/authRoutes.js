const express = require('express')
const { register, login, getUserData, logout } = require('../controllers/authController')
const authenticate = require('../middlewares/authMiddleware')
const router = express.Router()

// Rota de registro
router.post('/register', register)

// Rota de login
router.post('/login', login)

// Rota para buscar dados do usuário autenticado
router.get('/user', authenticate, getUserData)

// Rota de logout do usuário
router.post('/logout', authenticate, logout);

module.exports = router;