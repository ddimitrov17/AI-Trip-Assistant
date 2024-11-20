import { useParams } from 'react-router-dom';
import styles from './LocationsDetails.module.css';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Location from './Location/Location';

export default function LocationsDetails() {
    const { locationsId } = useParams();
    const [locationsData, setLocationsData] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocationsData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/locations/get-locations/${locationsId}`);
                const locationsData = await response.json();
                setLocationsData(locationsData);
            } catch (error) {
                console.error('Error fetching locations data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocationsData();
    }, [locationsId]);

    return (
        <div className={styles.locationsContainer}>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {(
                        locationsData.destinations.map((destination, index) => (
                            <Location
                                key={index}
                                locationName={destination.name}
                                locationDescription={destination.description}
                            />
                        ))
                    )}
                </>
            )}
        </div>
    );
}
