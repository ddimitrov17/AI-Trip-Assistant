import { useEffect, useState } from 'react';
import { GetPlaceDetails } from '../../../services/photo.api';
import styles from './PlanEntry.module.css';
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export default function PlanEntry({ entry, index, entryType,image }) {
    let name = entry.location || `Location Suggestions #${index + 1}`;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    let isLocationSuggestion = entry.destinations !== undefined;


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
                            src={image}
                            alt={name}
                            className={styles.image}
                            onClick={() => {
                                const path = routeMapping[entryType];
                                navigate(path);
                            }}
                        />
                    ) : (
                        <IoLocationSharp
                            className={styles.icon}
                            onClick={() => {
                                const path = routeMapping[entryType];
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
