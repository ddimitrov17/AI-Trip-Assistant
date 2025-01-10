const { db } = require("../database/database");

const REQUEST_LIMIT = 3;

const limitRequests = async (req, res, next) => {
  try {
    const userId = req.user.id; 
    const query = `
      SELECT 
        (SELECT COUNT(*) FROM itineraries WHERE user_id = $1) AS itinerary_count,
        (SELECT COUNT(*) FROM trip_destinations WHERE user_id = $1) AS trip_destination_count,
        (SELECT COUNT(*) FROM trips WHERE user_id = $1) AS trip_count
    `;

    const result = await db.query(query, [userId]);
    const { itinerary_count, trip_destination_count, trip_count } = result.rows[0];
    const totalRequests = Number(itinerary_count) + Number(trip_destination_count) + Number(trip_count);

    if (totalRequests >= REQUEST_LIMIT) {
      return res.status(403).json({ error: "Request limit exceeded." });
    }

    next(); 
  } catch (error) {
    console.error("Error in limitRequests middleware:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  limitRequests,
};
