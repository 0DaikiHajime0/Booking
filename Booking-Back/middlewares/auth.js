const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const token = req.headers.authorization;
    /*if (!token) return res.status(401).json({ message: 'Token no proporcionado' });*/
    const tokenParts = token.split(' ');
    const tokenReal = tokenParts[1];
    jwt.verify(tokenReal, 'srav', (err, decoded) => {
        if (err) return res.status(403).json({ message: `Token inválido ${tokenReal}` });
        
        req.usuario = decoded.usuario;
        next();
    });
}

module.exports = verificarToken;
