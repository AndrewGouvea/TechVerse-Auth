const jwt = require('jsonwebtoken')
const { isBlacklisted } = require('../utils/blacklist')

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido.' })
    }

    if (isBlacklisted(token)) {
        return res.status(401).json({ error: 'Token na blacklist. ' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido. ' })
        }
        req.user = decoded
        next()
    })
}

module.exports = authenticate