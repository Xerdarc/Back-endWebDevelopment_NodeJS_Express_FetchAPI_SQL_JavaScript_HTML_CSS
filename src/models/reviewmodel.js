// import the pool settings
const pool = require("../services/db")

// ========== INSERT ==========
module.exports.insert = (data, callback) => {
	const SQL = `
	INSERT INTO reviews (user_id, review, stars)
	VALUES (?, ?, ?)
	`
	const VALUES = [data.user_id, data.review, data.stars]
	pool.query(SQL, VALUES, callback)
}

// ========== SELECT ==========
module.exports.select = (callback) => {
	const SQL = `
	SELECT reviews.*, users.username
	FROM reviews
	JOIN users ON reviews.user_id = users.id
	ORDER BY created_on DESC
	`
	// Selects everything from the reviews table and the username from the username table
	// Specify the table
	// condition of what to select from the users table
	// order by the latest review
	pool.query(SQL, callback)
}

// ========== SELECT by user ID ==========
module.exports.selectid = (data, callback) => {
	const SQL = `
	SELECT * FROM reviews
	WHERE user_id = ?
	`
	const VALUES = [data.user_id]
	pool.query(SQL, VALUES, callback)
}

// ========== UPDATE ==========
module.exports.update = (data, callback) => {
	const SQL = `
	UPDATE reviews
	SET review = ?, stars = ?
	WHERE id = ?
	`
	const VALUES = [data.review, data.stars, data.review_id]
	pool.query(SQL, VALUES, callback)
}

// ========= DELETE ==========
// check if the user owns the review
module.exports.userownreview = (data, callback) => {
	const SQL = `
	SELECT * FROM reviews
	WHERE user_id = ? AND id = ?
	`
	const VALUES = [data.user_id, data.review_id]
	pool.query(SQL, VALUES, callback)
}
// delete the review
module.exports.delete = (data, callback) => {
	const SQL = `
	DELETE FROM reviews
	WHERE id = ?
	`
	const VALUES = [data.review_id]
	pool.query(SQL, VALUES, callback)
}

// ========== SELECT by review ID ==========
module.exports.selectrevid = (data, callback) => {
	const SQL = `
	SELECT * FROM reviews
	WHERE id = ?
	`
	const VALUES = [data.review_id]
	pool.query(SQL, VALUES, callback)
}