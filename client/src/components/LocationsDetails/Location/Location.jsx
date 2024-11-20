import { useEffect, useState } from "react";
import { GetPlaceDetails } from "../../../services/photo.api";
import styles from './Location.module.css'

export default function Location({ locationName, locationDescription }) {
    const [photoURL, setPhotoURL] = useState();
    useEffect(() => {
        locationName && GetPlacePhoto();
    }, [locationName]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: locationName
        };

        const result = await GetPlaceDetails(data);
        const PHOTO_REF_URL = `https://places.googleapis.com/v1/${result.data.places[0].photos[0].name}/media?maxHeightPx=800&maxWidthPx=1200&key=${import.meta.env.VITE_PLACES_API}`
        setPhotoURL(PHOTO_REF_URL)
    };
    return (
        <section className={styles.locationSection}>
            <img src={photoURL} alt="" className={styles.locationImage}/>
            <h2 className={styles.name}>{locationName}</h2>
            <p className={styles.description}>{locationDescription}</p>
        </section>
    )
}