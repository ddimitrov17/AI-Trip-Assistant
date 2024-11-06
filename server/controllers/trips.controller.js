const { db } = require("../database/database");

async function createTrip(req, res) {
    const { userId, location, number_of_days, number_of_people, budget, hotels, places_to_visit, food_recommendations } = req.body;

    try {
        const query = `
            INSERT INTO trips (user_id, location, number_of_days, number_of_people, budget, hotels, places_to_visit, food_recommendations)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        const values = [userId, location, number_of_days, number_of_people, budget, hotels, places_to_visit, food_recommendations];
        const result = await db.query(query, values);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving trip data' });
    }
};

async function getTripById(req, res) {
    const { tripId } = req.params; 

    try {
        const query = `SELECT * FROM trips WHERE id = $1`; 
        const values = [tripId];
        
        const result = await db.query(query, values); 

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.status(200).json(result.rows[0]); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving trip data' });
    }
}

module.exports = {
    createTrip,
    getTripById
}