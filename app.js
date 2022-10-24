// npm i express -> imports express into our project

// Imports express into our file
const Express = require("express")
const app = Express()

const beerRoutes = require("./controllers/beer")

const PORT = 4000

// .get() is a HTTP method
/* 
    takes a route as string as first parameter
    takes callback with req, res parameters to execute when the route is hit
*/

// Middleware method
app.use(beerRoutes)


// .listen() sets up an active server on a port of your choosing
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})