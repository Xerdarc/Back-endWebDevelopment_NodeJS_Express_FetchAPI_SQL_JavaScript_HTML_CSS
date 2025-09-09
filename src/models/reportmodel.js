const pool = require("../services/db")

// ========== MISCELLANEOUS ==========
// Check if user id exists
module.exports.checkUser = (data, callback) => {
	const SQL = `
		SELECT * FROM users
		WHERE id = ?
	`
	const VALUES = [data.user_id]
	pool.query(SQL, VALUES, callback)
}

// Check if vulnerability exists
module.exports.checkVul = (data, callback) => {
	const SQL = `
		SELECT * FROM vulnerabilities
		WHERE id = ?
	`
	const VALUES = [data.vulnerability_id]
	pool.query(SQL, VALUES, callback)
}

// Check if report exists
module.exports.checkRep = (data, callback) => {
	const SQL = `
		SELECT * FROM reports
		WHERE id = ?
	`
	const VALUES = [data.report_id]
	pool.query(SQL, VALUES, callback)
}
// ========== Handle requests ==========
// POST /reports
// Associate user id and vulnerability id in the report table
module.exports.insert = (data, callback) => {
	const SQL = `
	INSERT INTO reports (user_id, vulnerability_id, status)
	VALUES (?, ?, 0)
	`
	const VALUES = [data.user_id, data.vulnerability_id]
	pool.query(SQL, VALUES, callback)
}
// Fetch vulnerability points and set user reputation with its value
module.exports.set = (data, callback) => {
	const SQL = `
	UPDATE users
	JOIN vulnerabilities ON vulnerabilities.id = ?
	SET users.credits = users.credits + vulnerabilities.points
	WHERE users.id = ?
	`
	const VALUES = [data.vulnerability_id, data.user_id]
	pool.query(SQL, VALUES, callback)
}
// Fetch new credits to display
module.exports.select = (data, callback) => {
	const SQL = `
	SELECT credits FROM users
	WHERE id = ?
	`
	const VALUES = [data.user_id]
	pool.query(SQL, VALUES, callback)
}

// PUT /reports/:id
// Get vulnerability id from report table
module.exports.selectVulFromRep = (data, callback) => {
	const SQL = `
	SELECT * FROM reports
	WHERE id = ?
	`
	const VALUES = [data.report_id]
	pool.query(SQL, VALUES, callback)
}
// Set status to 1
module.exports.setStat = (data, callback) => {
	const SQL = `
	UPDATE reports
	SET status = 1
	WHERE id = ?
	`
	const VALUES = [data.report_id]
	pool.query(SQL, VALUES, callback)
}

// FOR SECTION B
module.exports.insertCloser = (data, callback) => {
	const SQL = `
	UPDATE reports
	SET closer_id = ?
	WHERE id = ?
	`
	const VALUES = [data.user_id, data.report_id]
	pool.query(SQL, VALUES, callback)
}

// ========== SELECT ==========
// select where report.status = 1
module.exports.selectallclosed = (callback) => {
	const SQL = `
	SELECT reports.*, vulnerabilities.type, users.username
	FROM reports
	JOIN vulnerabilities ON vulnerabilities.id = reports.vulnerability_id
	JOIN users ON users.id = reports.user_id
	WHERE reports.status = 1
	`
	pool.query(SQL, callback)
}
// select where report.status = 0
module.exports.selectallopen = (callback) => {
	const SQL = `
	SELECT reports.*, vulnerabilities.type, vulnerabilities.points, users.username
	FROM reports
	JOIN vulnerabilities ON vulnerabilities.id = reports.vulnerability_id
	JOIN users ON users.id = reports.user_id
	WHERE reports.status = 0
	`
	pool.query(SQL, callback)
}