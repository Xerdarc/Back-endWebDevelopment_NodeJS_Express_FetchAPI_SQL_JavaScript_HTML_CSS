// importing the app object
const app = require("./src/app")

// specify the port
const port = 3000
// set the server to listen to the port
app.listen(port, () => {
	console.log(`Listening to port ${port}`)
})