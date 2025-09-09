// import the model module
const model = require("../models/reviewmodel")

// ========== POST review ==========
module.exports.post = (req, res) => {
	const data = {
		user_id: res.locals.user_id,
		review: req.body.review,
		stars: req.body.stars
	}
	if (!req.body.review) {
		res.status(400).json({message: "Please enter a review."})
		return
	}
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
	model.insert(data, callback)
}

// ========== GET all ==========
module.exports.get = (req, res) => {
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		if (results.length == 0) {
			res.status(404).json({message: "No reviews yet."})
			return
		}
		else {
			res.status(200).json(results)
		}
	}
	model.select(callback)
}

// ========== GET by token ==========
module.exports.getbyid = (req, res) => {
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
			res.status(404).json({message: "User has not made a review."})
			return
		}
		else {
			res.status(200).json(results)
		}
	}
	model.selectid(data, callback)
}

// ========== DELETE by ID ==========
// Check if user has created reviews
module.exports.checkuserreview = (req, res, next) => {
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
			res.status(404).json({message: "User has not made a review."})
			return
		}
		else {
			next()
		}
	}
	model.selectid(data, callback)
}
// check if user owns the review
module.exports.checkuserown = (req, res, next) => {
	const data = {
		user_id: res.locals.user_id,
		review_id: req.params.review_id
	}
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		if (results.length == 0) {
			res.status(401).json({message: "User did not write this review."})
			return
		}
		else {
			next()
		}
	}
	model.userownreview(data, callback)
}
// delete the review
module.exports.controllerdelete = (req, res) => {
	const data = {
		user_id: res.locals.user_id,
		review_id: req.params.review_id
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
	model.delete(data, callback)
}

// ========== GET by review ID ==========
module.exports.getbyreviewid = (req, res) => {
	const data = {
		review_id: req.params.review_id
	}
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error."})
			return
		}
		if (results.length == 0) {
			res.status(404).json({message: "Review does not exist."})
			return
		}
		else {
			res.status(200).json(results[0])
		}
	}
	model.selectrevid(data, callback)
}

// =========== PUT ==========
module.exports.put = (req, res) => {
	const data = {
		review_id: req.params.review_id,
		review: req.body.review,
		stars: req.body.stars
	}
	if (!req.body.review) {
		res.status(400).json({message: "Please fill out all required fields."})
		return
	}
	const callback = (error, results) => {
		if (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error"})
			return
		}
		else {
			res.status(204).json(results)
		}
	}
	model.update(data, callback)
}