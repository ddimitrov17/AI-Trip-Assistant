import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styles from './ItineraryDetails.module.css'
import { IoLocationOutline } from "react-icons/io5";


export default function ItineraryDetails() {
    const { itineraryId } = useParams();
    const [itineraryData, setItineraryData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItineraryData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/itinerary/get-itinerary/${itineraryId}`);
                const data = await response.json();
                setItineraryData(data);
            } catch (error) {
                console.error('Error fetching itinerary data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItineraryData();
    }, [itineraryId]);

    return (
        <div>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {itineraryData && (
                        <section className={styles.itineraryContainer}>
                            <img src={itineraryData.location_image} alt="" className={styles.itineraryImage} />
                            <h2 className={styles.itineraryTitle}>{itineraryData.location}</h2>
                            <div>
                                {itineraryData.itinerary.map((currentItinerary, index) => (
                                    <div key={index} className={styles.dayDiv}>
                                        <h4 className={styles.dayNumber}>Day {currentItinerary.day}</h4>
                                        <div>
                                            {currentItinerary.activities.map((activity, activityIndex) => (
                                                <div key={activityIndex}>
                                                    <h5 className={styles.timeAndTitle}>{activity.time}: <span className={styles.light}>{activity.title}</span></h5>
                                                    <p className={styles.activityLocation}><span><IoLocationOutline className={styles.locationIcon}/>
                                                    </span> {activity.location}</p>
                                                    <p className={styles.activityDescription}>{activity.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </>
            )}
        </div>
    );
}
