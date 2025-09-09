// import the pool module
const pool = require("../services/db")

// create the SQL statement
const SQL = `
	CREATE TABLE IF NOT EXISTS users (
		id INT PRIMARY KEY AUTO_INCREMENT,
		username TEXT NOT NULL,
		password TEXT NOT NULL,
		created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		credits INT NOT NULL DEFAULT 0
		);
	
	CREATE TABLE IF NOT EXISTS reviews (
		id INT PRIMARY KEY AUTO_INCREMENT,
		user_id INT NOT NULL,
		review TEXT NOT NULL,
		stars INT NOT NULL,
		created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);
	
	CREATE TABLE IF NOT EXISTS vulnerabilities (
		id INT AUTO_INCREMENT PRIMARY KEY,
		type TEXT NOT NULL,
		description TEXT NOT NULL,
		points INT NOT NULL
		);

	CREATE TABLE IF NOT EXISTS reports (
		id INT AUTO_INCREMENT PRIMARY KEY,
		user_id INT NOT NULL,
		vulnerability_id INT NOT NULL,
		status BOOLEAN NOT NULL DEFAULT 0
		);

	CREATE TABLE IF NOT EXISTS characters (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name TEXT NOT NULL,
		type1 TEXT NOT NULL,
		type2 TEXT NOT NULL,
		rarity TEXT NOT NULL
		);

	CREATE TABLE IF NOT EXISTS usercharrel (
		id INT AUTO_INCREMENT PRIMARY KEY,
		user_id INT NOT NULL,
		character_id INT NOT NULL
		);

	CREATE TABLE IF NOT EXISTS quests (
		id INT AUTO_INCREMENT PRIMARY KEY,
		quest TEXT NOT NULL,
		credits INT NOT NULL
		);		

	TRUNCATE TABLE vulnerabilities;
	TRUNCATE TABLE characters;

	INSERT INTO vulnerabilities (type, description, points) VALUES
	("XSS", "The homepage is vulnerable to reflected XSS.", 50),
	("Open redirect", "The site has an open redirect vulnerability.", 20);

	INSERT INTO characters (name, type1, type2, rarity) VALUES
	("Wizard", "Magic", "AOE", "Rare"),
	("Archer", "Magic", "Single", "Rare"),
	("Mamai", "Physical", "AOE", "Super rare"),
	("Taikou", "Physical", "AOE", "Legendary"),
	("Power", "Physical", "Single", "Legendary"),
	("Oyogu", "Magic", "AOE", "Super rare"),
	("Angel", "Magic", "Single", "Rare"),
	("Knight", "Physical", "Single", "Rare"),
	("Tunism", "Magic", "AOE", "Super rare");

	INSERT INTO quests (quest, credits) VALUES
	("Find a vulnerability", 50),
	("Log a report", 75),
	("Close a report", 75),
	("Log in today", 20);
	
	ALTER TABLE vulnerabilities ADD user_id INT NOT NULL DEFAULT 0;
	ALTER TABLE reports ADD closer_id INT NOT NULL DEFAULT 0;
` // create table only if it does not exist

// query the pool with the statement
pool.query(SQL, (error, results) => {
	if (error) {
		console.error(error)
	}
	else {
		console.log("Successful")
	}
	process.exit()
})