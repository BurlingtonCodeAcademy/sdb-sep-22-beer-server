const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

router.post("/login", async (req, res) => {
    // Object destructuring
    let { email, password } = req.body
    
    try {
        const findUser = await User.findOne({ email })
        
        if (findUser) {
            const verifyPwd = await bcrypt.compare(password, findUser.password)
            
            const token = jwt.sign(
                // payload
                { _id: findUser._id },
                // secret key
                JWT_SECRET_KEY,
                // options ( 24 hour expiry )
                { expiresIn: "24h" }
            )

            verifyPwd
            ? res.status(200).json({
                message: `Logged in`,
                token
            })
            : res.status(403).json({
                message: `Incorrect Credentials`
            })
            
        } else {
            res.status(200).json({
                message: `Username not found`
            })
        }
        
    } catch(err) {
        console.error(err)
        res.status(500).json({
            message: `Error ${err}`
        })
    }
})

router.post("/register", async (req, res) => {
    let { fName, lName, email, password } = req.body

    try {
        if (!fName || !lName || !email || !password) {
            throw new Error("The user has provided invalid schema")
            res.status(406).json({
                message: "Invalid Schema"
            })
        } else {
            
            const newUser = new User(
                {
                    fName,
                    lName,
                    email,
                    password: bcrypt.hashSync(password, 10)
                }
            )

            await newUser.save()

            const token = jwt.sign(
                // payload
                { _id: newUser._id },
                // secret key
                JWT_SECRET_KEY,
                // options ( 24 hour expiry )
                { expiresIn: "24h" }
            )

            res.status(201).json({
                message: "User created",
                newUser,
                token
            })
        }
    } catch (err) {
        console.log(err.name, err.message)
        res.status(500).json({
            message: `Error ${err}`
        })
    }
    
})

// Cookie Testing Route

// Creating cookie
router.get("/setcookie", (_, res) => {
    res.cookie("server-authentication", "tippy-top-secret123", {
        path: "/",
        maxAge: 5000,
        expires: new Date("27 10 2022"),
        secure: false,
        httpOnly: true
    })
    res.status(200).json({
        message: "Cookie saved successfully."
    })
})

// Deleting cookie
router.get("/deletecookie", (_, res) => {
    res.clearCookie("server-authentication", {
        path: "/",
        maxAge: 5000,
        expires: new Date("27 10 2022"),
        secure: false,
        httpOnly: true
    })
    res.status(200).json({
        message: "All cookies cleared. No cookie monster present."
    })
})

module.exports = router