const bcrypt = require('bcrypt');
const { db } = require('../database/database');
const { generateToken } = require('./token');


async function signup(req, res) {
    try {
        const { username, email, password, fullName, repeat_password } = req.body;
        if (password != repeat_password) {
            return res.status(400).json({ error: "Passwords do not match!" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userExists = await db.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);

        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "Username or Email already exists" });
        }

        const newUser = await db.query(
            'INSERT INTO users (username, email, full_name, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, fullName, hashedPassword]
        );

        // Generate and set token in cookie
        generateToken(newUser.rows[0].id, newUser.rows[0].username, res);

        res.status(201).json({
            _id: newUser.rows[0].id,
            fullName: newUser.rows[0].full_name,
            username: newUser.rows[0].username,
            email: newUser.rows[0].email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        const user = await db.query('SELECT * FROM users WHERE username = $1', [username]);

        if (user.rows.length === 0) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.rows[0].password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Generate and set token in cookie
        generateToken(user.rows[0].id, user.rows[0].username, res);

        res.status(200).json({
            _id: user.rows[0].id,
            fullName: user.rows[0].full_name,
            username: user.rows[0].username,
            email: user.rows[0].email
        });
    } catch (error) {
        console.error('Error in login controller', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function current(req, res) {
    try {
        const userQuery = `
        SELECT id, username, full_name, email
        FROM users
        WHERE id = $1
`;

        const userResult = await db.query(userQuery, [req.user.id]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = userResult.rows[0];

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getting the currently logged in user", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    signup,
    login,
    current
};
