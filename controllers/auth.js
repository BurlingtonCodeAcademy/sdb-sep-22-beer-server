const router = require("express").Router()

let db = []

router.post("/login", (req, res) => {
    // Object destructuring
    let { email, password } = req.body

    try {
        res.status(202).json({
            message: "User logged in",
            email
        })
    } catch(err) {
        console.error(err)
        res.status(500).json({
            message: `Error ${err}`
        })
    }
})

router.post("/register", (req, res) => {
    let { fName, lName, email, password } = req.body

    try {
        if (!fName || !lName || !email || !password) {
            throw new Error("The user has provided invalid schema")
            res.status(406).json({
                message: "Invalid Schema"
            })
        } else {
            console.log(fName, lName, email, password)
            res.status(201).json({
                message: "User created",
                email
            })
        }
    } catch (err) {
        console.error(err)
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