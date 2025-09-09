const pool = require("../services/db")

// ========== SELECT all ==========
module.exports.selectall = (callback) => {
	const SQL = `
	SELECT * FROM quests
	`
	pool.query(SQL, callback)
}

// ========== UPDATE by ID ==========
// get credits from quest
module.exports.getquestcreds = (data, callback) => {
	const SQL = `
	UPDATE users
	SET users.credits = users.credits + 20
	WHERE users.id = ?
	`
	const VALUES = [data.user_id]
	pool.query(SQL, VALUES, callback)
}