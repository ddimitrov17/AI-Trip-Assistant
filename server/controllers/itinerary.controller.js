const { db } = require("../database/database");

async function createItinerary(req, res) {
    const { user_id, location, days, itinerary, location_image } = req.body;
    // console.log(req.body); //TODO: Remove
    try {
        const query = `
            INSERT INTO itineraries (user_id,location,days,itinerary,location_image)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [user_id, location, days, itinerary, location_image];
        const result = await db.query(query, values);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Database Error:', error.message);
        res.status(500).json({ message: 'Error saving itinerary data', error: error.message });
    }
}


async function getItineraryById(req, res) {
    const { itineraryId } = req.params;

    try {
        const query = `SELECT * FROM itineraries WHERE id = $1`;
        const values = [itineraryId];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving Itinerary data' });
    }
}

module.exports = {
    createItinerary,
    getItineraryById
}