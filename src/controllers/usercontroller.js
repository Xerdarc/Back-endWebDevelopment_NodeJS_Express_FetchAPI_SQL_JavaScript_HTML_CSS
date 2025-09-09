// import the model module
const model = require("../models/usermodel")

// ========== Miscellaneous ==========
// check if username already exists
module.exports.checkifusernameexists = (req, res, next) => {
	const data = {
		username: req.body.username
	}
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		if (results.length > 0) {
			res.status(409).json({message: "Username alreaedy taken."})
			return
		}
		else {
			next()
		}
	}
	model.selectbyusername(data, callback)
}

// check if user ID exists
module.exports.checkifuseridexists = (req, res, next) => {
	const data = {
		user_id: res.locals.user_id,
	}
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		if (results.length == 0) {
			res.status(404).json({message: "User not found."})
			return
		}
		else {
			next()
		}
	}
	model.selectbyid(data, callback)
}

// ========== CREATE NEW USER (register) ==========
module.exports.register = (req, res, next) => {
	const data = {
		username: req.body.username,
		password: req.body.password
	}
	if (!req.body.username) {
		res.status(400).json({message: "Please fill out all required fields."})
		return
	}
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		else {
			res.locals.data = {
				username: data.username,
				password: data.password
			}
			next()
		}
	}
	model.selectbyusername(data, callback)
}
// add user to database
module.exports.postuser = (req, res, next) => {
	const data = res.locals.data
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		else {
			res.locals.data.message = `User "${data.username}" has been created successfully.`
			res.locals.data.user_id = results.insertId
			next()
		}
	}
	model.insertuser(data, callback)
}

// ========== LOGIN ==========
module.exports.login = (req, res, next) => {
	const data = {
		username: req.body.username,
		password: req.body.password
	}
	if (!req.body.username || !req.body.password) {
		res.status(400).json({message: "Please fill out all required fields."})
		return
	}
	// the same model as check if username exists is being used, but different things need to be stored in the res.locals object
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		if (results.length == 0) {
			res.status(404).json({message: "User not found."})
			return
		}
		else {
			res.locals.data = {
				password: data.password, // password provided by the user in the request body
				hash: results[0].password, // hashed password from the database
				user_id: results[0].id, // user ID will be used for token generation
				message: "Logged in successfully." // message willl only be shown at the end of the middlewares, after token has been sent
			}
			next()
		}
	}
	model.selectbyusername(data, callback)
}

// ========== PUT user ==========
module.exports.put = (req, res) => {
	const data = {
		user_id: res.locals.user_id,
		username: req.body.username
	}
	if (!req.body.username) {
		res.status(400).json({message: "Please fill out all required fields."})
		return
	}
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		else {
			res.status(204).json(results)
		}
	}
	model.update(data, callback)
}

// ========== GET by token ==========
module.exports.getbytoken = (req, res) => {
	const data = {
		user_id: res.locals.user_id // don't need to be passed through any routes/body
	}
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		else {
			res.status(200).json(results[0])
		}
	}
	model.selectbytoken(data, callback)
}

// ========== GET all characters associated with user ==========
module.exports.getassociation = (req, res) => {
	const data = {
		user_id: res.locals.user_id
	}
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		if (results.length == 0) {
			res.status(404).json({message: "User does not have any characters."})
			return
		}
		else {
			res.status(200).json(results)
		}
	}
	model.selectassociation(data, callback)
}