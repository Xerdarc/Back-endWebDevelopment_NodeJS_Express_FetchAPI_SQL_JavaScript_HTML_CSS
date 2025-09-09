const model = require("../models/reportmodel")

// ========== MISCELLANEOUS ==========
// Check if vulnerability exists
module.exports.captureVul = (req, res, next) => {
	const data = {
		vulnerability_id: req.body.vulnerability_id,
	}
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		else {
			if (!req.body.vulnerability_id) {
				res.status(400).json({message: "Please make sure all required fields are filled up."})
				return
			}
			else {
				if (results.length == 0) {
					res.status(404).json({message: "Vulnerability does not exist."})
					return
				}
				else {
					next()
				}
			}	
		}
	}
	model.checkVul(data, callback)
}

// Check if report exists
module.exports.captureRep = (req, res, next) => {
	const data = {
		report_id: req.params.id,
	}
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		else {
			if (req.body.status == undefined || req.body.status == "") {
				res.status(400).json({message: "Please make sure all required fields are filled up."})
				return
			}
			else {
				if (results.length == 0) {
					res.status(404).json({message: "Report does not exist."})
					return
				}
				else {
					next()
				}
			}	
		}
	}
	model.checkRep(data, callback)
}

// ========== POST ==========
// insert into report table
module.exports.associate = (req, res, next) => {
	const data = {
		user_id: res.locals.user_id,
		vulnerability_id: req.body.vulnerability_id
	}
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		req.reportData = { // stores data in the req object under the name "reportData", so that the next middleware function(s) can access it
			user_id: data.user_id,
			vulnerability_id: data.vulnerability_id,
			insertId: results.insertId
		}
		next()
	}
	model.insert(data, callback)
}
// update user's credits
module.exports.updateReputation = (req, res, next) => {
	const data = req.reportData // accessing the data stored in the req object
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
	model.set(data, callback)
}
// show results
module.exports.show = (req, res) => {
	const data = req.reportData
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		else {
			res.status(201).json({
				id: data.insertId,
				user_id: data.user_id,
				vulnerability_id: data.vulnerability_id,
				status: 0,
				user_reputation: results[0].reputation
			})
		}
	}
	model.select(data, callback)
}

// ========== PUT ==========
module.exports.getAssociatedVulnerability = (req, res, next) => {
	const data = {
		report_id: req.params.id,
		status: req.body.status,
		user_id: res.locals.user_id
	}
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		if (data.status !== 1) {
			res.status(401).json({message: "Status still unresolved"}) // prevents the status from not being 1
			return
		}
		req.vulData = {
			report_id: data.report_id,
			status: data.status,
			user_id: data.user_id,
			vulnerability_id: results[0].vulnerability_id // extracting the id from the results of the executed SQL statement
		}
		next()
	}
	model.selectVulFromRep(data, callback)
}
module.exports.updateCloserReputation = (req, res, next) => {
	const data = req.vulData
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
	model.set(data, callback)
}
module.exports.updateStatus = (req, res, next) => {
	const data = req.vulData
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
	model.setStat(data, callback)
}
module.exports.showNewVulStat = (req, res, next) => {
	const data = req.vulData
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		else {
			res.status(200).json({
				id: Number(data.report_id),
				status: data.status,
				closer_id: data.user_id,
				credits: results[0].credits
			})
		}
		next()
	}
	model.select(data, callback)
}

// FOR SECTION B
module.exports.makeCloserId = (req, res) => {
	const data = req.vulData
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
	}
	model.insertCloser(data, callback)
}

// ========== GET all report ==========
module.exports.getclosed = (req, res) => {
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		if (results.length == 0) {
			res.status(404).json({message: "No closed reports."})
			return
		}
		else res.status(200).json(results)
	}
	model.selectallclosed(callback)
}

module.exports.getopen = (req, res) => {
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		if (results.length == 0) {
			res.status(404).json({message: "No open reports."})
			return
		}		
		else res.status(200).json(results)
	}
	model.selectallopen(callback)
}