// npm i express -> imports express into our project

// Imports express into our file
require("dotenv").config()
const Express = require("express")
const cookieParser = require("cookie-parser")
const app = Express()
const cors = require("cors")
const mongoose = require("mongoose")

const validateSession = require("./middlewares/validateSession")
const beerRoutes = require("./controllers/beer")
const auth = require("./controllers/auth")

const PORT = process.env.PORT || 4000
const MONGO_URL = process.env.MONGO_URL

// .get() is a HTTP method
/* 
    takes a route as string as first parameter
    takes callback with req, res parameters to execute when the route is hit
*/

// Middleware method

function logTime(req, res, next) {
    let date = new Date()
    console.log(date.toLocaleDateString())
    next()
}


// Middleware for serving static files
// app.use(Express.static())
// app.use(Express.static(__dirname + "/static"))

// app.get("/test", (req, res) => {
//     res.render("index")
// })

app.use(cors())
app.use(cookieParser())
app.use(logTime)
app.use(Express.json())
app.use(Express.urlencoded({extended: true}))
app.use(auth)
// This is a main route /api
// Everything inside beerRoutes becomes a subroute
app.use("/api", validateSession, beerRoutes)

mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log(`Connected to: ${MONGO_URL}`))
    .catch((err) => console.log(err))

// .listen() sets up an active server on a port of your choosing
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})