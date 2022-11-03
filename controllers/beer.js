const router = require("express").Router()
const Beer = require("../models/Beer")

// Get All Beers
router.get("/", async (_, res) => {
    try {
        let findAllBeers = await Beer.find({})
        
        res.status(200).json({
            findAllBeers
        })
    } catch (err) {
        console.log(err.name, err.message)

        res.status(500).json({
            message: `Error: ${err}`
        })
    }
})

// Create a Beer
router.post("/", async (req, res) => {
    const { 
        name,
        brewery,
        type,
        origin,
        abv,
        container,
        color,
        isFiltered,
        inStock,
        price,
        taste,
        userId
    } = req.body

    try {
        const newBeer = new Beer(
            {
                name,
                brewery,
                type,
                origin,
                abv,
                container,
                color,
                isFiltered,
                inStock,
                price,
                taste,
                userId
            }
        )

        await newBeer.save()

        res.status(201).json({
            message: `Brewski created`,
            newBeer
        })

    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: `Error: ${err}`
        })
    }
})

// Update a Beer
router.put("/:id", async (req, res) => {
    const id = req.params.id
    const newBeer = req.body

    try {
        let updatedBeer = await Beer.updateOne(
            { _id: id },
            { $set: newBeer }
        )

        res.status(200).json({
            message: `Beer updated`,
            updatedBeer
        })

    } catch (err) {
        console.log(err.name, err.message)

        res.status(500).json({
            message: `Error: ${err}`
        })
    }
})

// Delete a Beer
router.delete("/:id", async (req, res) => {
    let id = req.params.id

    try {
        let deleteBeer = await Beer.deleteOne({ _id: id })

        res.status(200).json({
            message: `Beer deleted`,
            deleteBeer
        })
    } catch (err) {
        console.log(err.name, err.message)
        
        res.status(500).json({
            message: `Error: ${err}`
        })
    }


})

module.exports = router