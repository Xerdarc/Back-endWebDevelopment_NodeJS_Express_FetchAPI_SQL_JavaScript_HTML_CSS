// import the required modules
require("dotenv").config()
const jwt = require("jsonwebtoken")

// set the configuration options for HWT using the .env file
const secretkey = process.env.JWT_SECRET_KEY
const tokenduration = process.env.JWT_EXPIRES_IN
const tokenalgorithm = process.env.JWT_ALGORITHM

// generate token
module.exports.generate = (req, res, next) => {
	const payload = {
		user_id:res.locals.data.user_id,
		timestamp: new Date()
	}
	const options = {
		algorithm: tokenalgorithm,
		expiresIn: tokenduration
	}
	const callback = (error, token) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		else {
			res.locals.token = token
			next()
		}
	}
	const token = jwt.sign(payload, secretkey, options, callback)
}

// send token
module.exports.send = (req, res) => {
	res.status(200).json({
		message: res.locals.data.message,
		token: res.locals.token
	})
}

// verify token
module.exports.verifytoken = (req, res, next) => {
	const authheader = req.headers.authorization
	if (!authheader || !authheader.startsWith("Bearer ")) {
		res.status(401).json({message: "No token provided."})
		return
	}
	const token = authheader.substring(7)
	const callback = (error, decoded) => {
		if (error) {
			res.status(401).json({message: "Invalid token."})
			return
		}
		res.locals.user_id = decoded.user_id
		res.locals.tokentimestamp = decoded.timestamp
		next()
	}
	jwt.verify(token, secretkey, callback)
}