import { useParams } from 'react-router-dom';
import styles from './Trip.module.css';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Hotel from './Hotel/Hotel';
import PlaceToVisit from './PlaceToVisit/PlaceToVisit';
import FoodRecs from './FoodRecs/FoodRecs';
import { GetPlaceDetails } from '../../services/photo.api';

export default function Trip() {
    const { tripId } = useParams();
    const [tripData, setTripData] = useState();
    const [loading, setLoading] = useState(true);
    const [photoURL,setPhotoURL]=useState();
    useEffect(() => {
        tripData && GetPlacePhoto();
    }, [tripData]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: tripData.location
        };

        const result = await GetPlaceDetails(data);
        const PHOTO_REF_URL=`https://places.googleapis.com/v1/${result.data.places[0].photos[1].name}/media?maxHeightPx=400&maxWidthPx=800&key=${import.meta.env.VITE_PLACES_API}`
        setPhotoURL(PHOTO_REF_URL)
    };

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
                    <img src={photoURL} alt="" />
                    <h1>{tripData.location}</h1>

                    <section className={styles.section}>
                        <h2>Hotel Recommendations</h2>
                        {tripData.hotels?.map((hotel, index) => (
                            <Hotel
                                key={index}
                                hotel={hotel} />
                        ))}
                    </section>

                    <section className={styles.section}>
                        <h2>Places to Visit</h2>
                        {tripData.places_to_visit?.map((place, index) => (
                            <PlaceToVisit
                                key={index}
                                place={place} />
                        ))}
                    </section>

                    <section className={styles.section}>
                        <h2>Budget Matching Food Recommendations</h2>
                        {tripData.food_recommendations?.map((restaurant, index) => (
                            <FoodRecs
                                key={index}
                                restaurant={restaurant} />
                        ))}
                    </section>
                </>
            )}
        </div>
    );
}
