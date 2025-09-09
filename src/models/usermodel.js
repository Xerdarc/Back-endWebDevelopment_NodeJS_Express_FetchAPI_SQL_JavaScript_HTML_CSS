// import the pool settings
const pool = require("../services/db")

// ========== Miscellaneous ==========
// check if username already exists
module.exports.selectbyusername = (data, callback) => {
	const SQL = `
	SELECT * FROM users
	WHERE username = ?
	`
	const VALUES = [data.username]
	pool.query(SQL, VALUES, callback)
}

// check if user ID exists
module.exports.selectbyid = (data, callback) => {
	const SQL = `
	SELECT * FROM users
	WHERE id = ?
	`
	const VALUES = [data.user_id]
	pool.query(SQL, VALUES, callback)
}

// ========== CREATE NEW USER ==========
// add user to database
module.exports.insertuser = (data, callback) => {
	const SQL = `
	INSERT INTO users (username, password)
	VALUES (?, ?)
	`
	const VALUES = [data.username, data.password]
	pool.query(SQL, VALUES, callback)
}

// ========== UPDATE user ==========
module.exports.update = (data, callback) => {
	const SQL = `
	UPDATE users
	SET username = ?
	WHERE id = ?
	`
	const VALUES = [data.username, data.user_id]
	pool.query(SQL, VALUES, callback)
}

// ========== SELECT by token ==========
module.exports.selectbytoken = (data, callback) => {
	const SQL = `
	SELECT id, username, created_on, credits FROM users
	WHERE id = ?
	`
	const VALUES = [data.user_id]
	pool.query(SQL, VALUES, callback)
}

// ========== SELECT all characters associated with user ==========
module.exports.selectassociation = (data, callback) => {
	const SQL = `
	SELECT characters.*
	FROM characters
	JOIN usercharrel ON usercharrel.character_id = characters.id
	WHERE usercharrel.user_id = ?
	`
	const VALUES = [data.user_id]
	pool.query(SQL, VALUES, callback)
}