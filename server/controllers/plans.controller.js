const { db } = require("../database/database");

async function getAllTypeOfUser(req, res) {
    const userId  = req.user.id;
    const { type } = req.params;

    try {
        const query = `SELECT * FROM ${type} WHERE user_id = $1`;
        const values = [userId];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Type not found' });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving Type data' });
    }
}

module.exports = {
    getAllTypeOfUser
}