import jwt from 'jsonwebtoken';

function authMiddleware (req, res, next) {
    const token = req.headers['authorization'];

    if(!token){return res.status(401).json({message: "Token required"})}
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {return res.status(401).json({message: "Invalid token"})}
        req.userId = decoded.userId
        next()
    })
}

export default authMiddleware;