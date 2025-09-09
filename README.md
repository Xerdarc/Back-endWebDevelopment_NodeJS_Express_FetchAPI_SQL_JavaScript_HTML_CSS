This application handles a bug bounty system. Users can register and modify their accounts, log and view vulnerabilities, and create reports that associate users to vulnerabilities or alter the status of vulnerabilities.

The application also has gamification aspects where users can earn credits for various accomplishments (quests). Users can view quests to complete, earning credits which can be used to spin the wheel and stand a chance to obtain prestigious characters, motivating users to enhance their statistics. Upon embarking on a quests, the system redirects the user to the corresponding quest.


Modules imported: express, mysql2, dotenv, nodemon

Tools for testing: Postman


Folders:

public - contains the frontend files

css - contains CSS files

js - contains scripts

media - contains the media such as videos and images

src - contains the backend files

services - handles the SQL database connection and settings

configs - contains the SQL query to create tables used

controllers - contains the codes that handle the different HTTP requests

models - containes the SQL queries that are executed based on the HTTP request

routes - contains the codes that manage the different paths used by the app (e.g. /reports, /users)


Start app: npm start

Start app in troubleshooting mode (nodemon automatic restart on change): npm run dev


API documentation (testing for POSTMAN):

- Section A

	POST /api/register - Create a new user (with token) {username, password}

	POST /api/login - Log in to an existing account (using token for verification) {username, password}

	GET /api/users - Retrieve the information of a specific user using the token

	PUT /api/users - Update a user's details using the token {username}

	GET /api/review - Get all reviews and its information

	POST /api/review - Create a new review {review, stars}

	PUT /api/review/:review_id - Update a user's review {review, stars}

- Section B

	POST /api/vulnerability - Create a vulnerability {type, description, points}

	GET /api/vulnerability - Retrieve a list of all vulnerabilities and its information

	POST /api/report - Create a report, stores the user ID in the report table using the token, and adds the points associated with the vulnerability to the associated user's credits {vulnerability_id}

	PUT /api/report/:id - Update a report's details to close the report using a boolean value, puts the user ID in the report table as closer ID (using token), and adds the points associated with the vulnerability to the user who closed it {status}

	GET /api/character - Retrieve a list of all characters

	GET /api/character/credits - Fetch how many credits a user has

	POST /api/character - Obtain a character based on the request body (the spin-the-wheel mechanism gives the random character in request body), and associates the character with the user {character_name}


Database schema:

characters(id, name, type1, type2, rarity)

quests(id, quest, credits)

reports(id, user_id, vulnerability_id, status, closer_id)

reviews(id, user_id, review, stars, created_on)

usercharrel(id, user_id, character_id)

users(id, username, password, created_on, credits)

vulnerabilities(id, type, description, points, user_id)