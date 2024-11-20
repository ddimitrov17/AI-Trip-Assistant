const { db } = require("../database/database");

async function createItinerary(req, res) {
    const { user_id, location, days, itinerary } = req.body;

    try {
        const query = `
            INSERT INTO itineraries (user_id,location,days,itinerary)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [user_id, location, days, itinerary];
        const result = await db.query(query, values);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Database Error:', error.message);
        res.status(500).json({ message: 'Error saving itinerary data', error: error.message });
    }
}


async function getItineraryById(req, res) {
    // const { locationsId } = req.params;

    // try {
    //     const query = `SELECT * FROM trip_destinations WHERE id = $1`;
    //     const values = [locationsId];

    //     const result = await db.query(query, values);

    //     if (result.rows.length === 0) {
    //         return res.status(404).json({ message: 'Locations not found' });
    //     }

    //     res.status(200).json(result.rows[0]);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Error retrieving locations data' });
    // }
}

module.exports = {
    createItinerary,
    getItineraryById
}