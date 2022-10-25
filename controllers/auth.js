const router = require("express").Router()

let db = []

// TODO: Create a login route

router.post("/login", (req, res) => {
    // Object destructuring
    let { email, password } = req.body
    console.log(password, email)

    res.status(202).json({
        message: "User logged in",
        email
    })
})
// TODO: Create a register route
/* 
    Update the db array with a new user object each time a user registers

    new user should have properties of:
    fName, lName, email, password
*/

router.post("/register", (req, res) => {
    let { email } = req.body

    try {
        db.push(req.body)
        console.log(db)
        res.status(201).json({
            message: "User created",
            email
        })
    } catch (e) {
        console.log(e)
        res.send(500).json({
            message: `Error ${e}`
        })
    }
})


module.exports = router