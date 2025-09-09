// import the required modules
const express = require("express")

// creating an instance of the Express application
const app = express()

// set up middleware functions
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// setting up static files
app.use("/", express.static("public"))

// import and load main route
const mainroutes = require("./routes/mainroutes")
app.use("/api", mainroutes)

// export the app object
module.exports = app