const router = require("express").Router()

// Get All Beers
router.get("/", (req, res) => {
    res.send("Gets all beers")
})

// Create a Beer
router.post("/", (req, res) => {

})

// Update a Beer
router.put("/:id", (req, res) => {

})

// Delete a Beer
router.delete("/:id", (req, res) => {

})

module.exports = router