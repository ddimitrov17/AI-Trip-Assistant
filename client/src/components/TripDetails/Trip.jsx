import { useParams } from 'react-router-dom';
import styles from './Trip.module.css';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function Trip() {
    const { tripId } = useParams();
    const [tripData, setTripData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTripData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/trips/get-trip/${tripId}`);
                const tripData = await response.json();
                setTripData(tripData);
                console.log(tripData)
            } catch (error) {
                console.error('Error fetching trip data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTripData();
    }, [tripId]); 

    return (
        <div className={styles.tripContainer}>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <h1>Comprehensive Travel Plan</h1>

                    <section className={styles.section}>
                        <h2>Hotels</h2>
                        {tripData.hotels?.map((hotel, index) => (
                            <div key={index} className={styles.hotel}>
                                <p>Name: {hotel.hotel_name}</p>
                                <p>Address: {hotel.address}</p>
                                <p>Price per Night: ${hotel.price_per_night} per person</p>
                                <p>Coordinates: {hotel.geo_coordinates.latitude}, {hotel.geo_coordinates.longitude}</p>
                            </div>
                        ))}
                    </section>

                    <section className={styles.section}>
                        <h2>Places to Visit</h2>
                        {tripData.places_to_visit?.map((place, index) => (
                            <div key={index} className={styles.place}>
                                <p>Place Name: {place.place_name}</p>
                                <p>Description: {place.description}</p>
                                <p>Coordinates: {place.geo_coordinates.latitude}, {place.geo_coordinates.longitude}</p>
                                <p>Ticket Price: ${place.ticket_pricing} per person</p>
                            </div>
                        ))}
                    </section>

                    <section className={styles.section}>
                        <h2>Food Recommendations</h2>
                        {tripData.food_recommendations?.map((restaurant, index) => (
                            <div key={index} className={styles.food}>
                                <p>Name: {restaurant.restaurant_name}</p>
                                <p>Address: {restaurant.address}</p>
                                <p>Price Range: {restaurant.price_range}</p>
                                <p>Cuisine Type: {restaurant.cuisine_type}</p>
                                <p>Opening Hours: {restaurant.opening_hours}</p>
                            </div>
                        ))}
                    </section>
                </>
            )}
        </div>
    );
}
