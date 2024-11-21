import { useEffect, useState } from 'react';
import { GetPlaceDetails } from '../../../services/photo.api';
import styles from './PlanEntry.module.css';
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export default function PlanEntry({ entry, index, entryType }) {
    let name = entry.location || `Location Suggestions #${index + 1}`;
    const [photoURL, setPhotoURL] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    let isLocationSuggestion = entry.destinations !== undefined;

    useEffect(() => {
        if (name) {
            GetPlacePhoto();
        }
    }, [name]);

    const GetPlacePhoto = async () => {
        setLoading(true); 
        if (entryType=='trip_destinations') {
            setLoading(false)
            return;
        }
        const data = {
            textQuery: name
        };

        const result = await GetPlaceDetails(data);
        const PHOTO_REF_URL = `https://places.googleapis.com/v1/${result.data.places[0].photos[0].name}/media?maxHeightPx=800&maxWidthPx=1200&key=${import.meta.env.VITE_PLACES_API}`;
        setPhotoURL(PHOTO_REF_URL);
        setLoading(false); 
    };

    const routeMapping = {
        'trips': `/trip-details/${entry.id}`,
        'trip_destinations': `/locations-details/${entry.id}`,
        'itineraries': `/itinerary-details/${entry.id}`
    };

    return (
        <div className={styles.entry}>
            {loading ? (
                <div className={styles.loading}></div>
            ) : (
                <>
                    {!isLocationSuggestion ? (
                        <img
                            src={photoURL}
                            alt={name}
                            className={styles.image}
                            onClick={() => {
                                const path = routeMapping[entryType];
                                console.log(path);
                                navigate(path);
                            }}
                        />
                    ) : (
                        <IoLocationSharp
                            className={styles.icon}
                            onClick={() => {
                                const path = routeMapping[entryType];
                                console.log(path);
                                navigate(path);
                            }}
                        />
                    )}
                </>
            )}
            <h4>{name}</h4>
        </div>
    );
}
