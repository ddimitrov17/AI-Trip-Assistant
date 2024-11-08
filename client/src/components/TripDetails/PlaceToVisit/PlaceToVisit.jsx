import { useEffect, useState } from 'react';
import { GetPlaceDetails } from '../../../services/photo.api';
import styles from './PlaceToVisit.module.css'

export default function PlaceToVisit({ index, place,location }) {
    const [photoURL, setPhotoURL] = useState();
    useEffect(() => {
        place && GetPlacePhoto();
    }, [place]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: `${place.place_name},${location}`
        };
        const result = await GetPlaceDetails(data);
        const PHOTO_REF_URL = `https://places.googleapis.com/v1/${result.data.places[0].photos[0].name}/media?maxHeightPx=400&maxWidthPx=800&key=${import.meta.env.VITE_PLACES_API}`
        setPhotoURL(PHOTO_REF_URL)
    };
    return (
        <div key={index} className={styles.place}>
            <div className={styles.placeImage}>
                <img src={photoURL} alt="" className={styles.placeImageElement} />
            </div>
            <div className={styles.placeDescription}>
                <p className={styles.placeTitle}>{place.place_name}</p>
                <p className={styles.placeExplanation}>{place.description}</p>
                <p className={styles.placePrice}><span>Ticket Price:</span> ${place.ticket_pricing} per person</p>
            </div>
        </div>
    )
}