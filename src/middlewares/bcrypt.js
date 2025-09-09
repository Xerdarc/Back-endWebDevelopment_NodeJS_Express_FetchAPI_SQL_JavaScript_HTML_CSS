// import the required modules
const bcrypt = require("bcrypt")

// set salt rounds
const saltRounds = 10 // default: 10

// hash password middleware
module.exports.hashpassword = (req, res, next) => {
	const data = res.locals.data
	const callback = (error, hash) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		else {
			res.locals.data.password = hash
			next()
		}
	}
	bcrypt.hash(data.password, saltRounds, callback)
}

// compare password
module.exports.comparepassword = (req, res, next) => {
	const data = res.locals.data
	const callback = (error, match) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		else {
			if (!match) {
				res.status(401).json({message: "Wrong password."})
			}
			else {
				next()
			}
		}
	}
	bcrypt.compare(data.password, data.hash, callback)
}