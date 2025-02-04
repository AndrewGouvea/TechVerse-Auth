const blacklist = new Set();

// Adiciona um token à blacklist
const addToBlacklist = token => {
    blacklist.add(token);
}

// Verifica se um token está na blacklist
const isBlacklisted = token => {
    return blacklist.has(token)
}

module.exports = { addToBlacklist, isBlacklisted }