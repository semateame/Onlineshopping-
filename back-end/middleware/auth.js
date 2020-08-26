const jwt = require("jsonwebtoken")
const fs = require("fs")

const auth = async(req, res, next) => {
    const authtoken = req.headers['authorization']
    const token = authtoken.replace('Bearer ', '')
    jwt.verify(token, 'task', (err, payload) => {
        if (payload.role === "vendor") {
            next()
        } else {
            res.status(401).json({ msg: "unathorized" })
        }
    })


}

module.exports = auth