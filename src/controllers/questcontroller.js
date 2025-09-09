// import the model module
const model = require("../models/questmodel")

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

// ========== PUT ==========
// get credits from vulnerability
module.exports.getcredits = (req, res, next) => {
	const data = {
		user_id: res.locals.user_id,
	}
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
	model.getquestcreds(data, callback)
}