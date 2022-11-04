const jwt = require("jsonwebtoken")
const User = require("../models/User")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const validateSession = async (req, res, next) => {
    try {
        if (req.method === "OPTIONS") {
            next()
        } else if (req.headers.authorization) {
            
            const authToken = req.headers.authorization.includes("Bearer")
            ? req.headers.authorization.split(" ")[1]
            : req.headers.authorization
            

            let payload = authToken ? jwt.verify(authToken, JWT_SECRET_KEY) : undefined

            if (payload) {
                const findUser = await User.findOne(
                    { _id: payload._id }
                )

                if (findUser) {
                    req.user = findUser
                    next()
                } else {
                    res.status(400).json({
                        message: `User not found`
                    })
                }
            } else {
                res.status(401).json({
                    message: `Invalid token`
                })
            }
        } else {
            res.status(403).json({
                message: `Forbidden`
            })
        }
    } catch(err) {
        res.status(500).json({
            message: `Error in middleware`,
            error: `${err}`
        })
    }
}

module.exports = validateSession