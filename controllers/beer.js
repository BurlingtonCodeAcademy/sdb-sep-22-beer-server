const router = require("express").Router()

router.get("/:name", (req, res) => {
    let name = req.params.name
    res.send(`Hello from the main endpoint ${name}`)
})

module.exports = router