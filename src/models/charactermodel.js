const pool = require("../services/db")

// ========== SELECT all ==========
module.exports.selectall = (callback) => {
	const SQL = `
		SELECT * FROM characters
	`
	pool.query(SQL, callback)
}

// ========== Pull for character ==========
// check how many creds the user has
module.exports.selectcreds = (data, callback) => {
	const SQL = `
		SELECT credits FROM users
		WHERE id = ?
	`
	const VALUES = [data.user_id]
	pool.query(SQL, VALUES, callback)
}
// deduct credits
module.exports.deductcreds = (data, callback) => {
	const SQL = `
		UPDATE users
		SET credits = credits - 100
		WHERE id = ?
	`
	const VALUES = [data.user_id]
	pool.query(SQL, VALUES, callback)
}
// get character ID from character name
module.exports.selectidbyname = (data, callback) => {
	const SQL = `
		SELECT id FROM characters
		WHERE name = ?
	`
	const VALUES = [data.character_name]
	pool.query(SQL, VALUES, callback)
}
// associate in table
module.exports.associate = (data, callback) => {
	const SQL = `
		INSERT INTO usercharrel (user_id, character_id)
		VALUES (?, ?)
	`
	const VALUES = [data.user_id, data.character_id]
	pool.query(SQL, VALUES, callback)
}