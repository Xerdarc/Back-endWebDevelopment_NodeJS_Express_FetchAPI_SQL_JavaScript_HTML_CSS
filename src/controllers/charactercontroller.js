const model = require("../models/charactermodel")

// ========== GET all ==========
module.exports.getall = (req, res) => {
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		else {
			res.status(200).json(results)
		}		
	}
	model.selectall(callback)
}

// ========== Pull for character ==========
// check how many creds the user has and throw error if insufficient
module.exports.getcreds = (req, res) => {
	const data = {
		user_id: res.locals.user_id
	}
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}		
		if (results[0].credits < 100) {
			res.status(400).json({message: "Insufficient credits."})
			return
		}
		else {
			res.status(200).json(results[0])
		}
	}
	model.selectcreds(data, callback)
}
// deduct credits
module.exports.deductcredits = (req, res, next) => {
	const data = {
		user_id: res.locals.user_id
	}
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		else {
			next()
		}
	}
	model.deductcreds(data, callback)
}
// get character ID using character name
module.exports.getcharid = (req, res, next) => {
	const data = {
		character_name: req.body.character_name
	}
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		if (results.length == 0) {
			res.status(404).json({message: "Character not found."})
			return
		}
		else {
			req.data = {
				user_id: res.locals.user_id,
				character_id: results[0].id
			}
			next()
		}		
	}
	model.selectidbyname(data, callback)
}
// associate in the table
module.exports.association = (req, res) => {
	const data = req.data
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		else {
			res.status(201).json(results)
		}
	}
	model.associate(data, callback)
}