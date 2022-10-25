const router = require("express").Router()

// TODO: Create a login route

router.get("/login", (req, res) => {
    // Object destructuring
    let { email, password } = req.query
    console.log(password, email)

    res.status(202).json({
        message: "User logged in",
        email
    })
})
// TODO: Create a register route

module.exports = router