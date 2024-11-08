import { useEffect, useState } from 'react';
import styles from './Hotel.module.css'
import { GetPlaceDetails } from '../../../services/photo.api';

export default function Hotel({ hotel, index }) {
    const [photoURL,setPhotoURL]=useState();
    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel.hotel_name
        };

        const result = await GetPlaceDetails(data);
        const PHOTO_REF_URL=`https://places.googleapis.com/v1/${result.data.places[0].photos[0].name}/media?maxHeightPx=400&maxWidthPx=800&key=${import.meta.env.VITE_PLACES_API}`
        setPhotoURL(PHOTO_REF_URL)
    };
    return (
        <div key={index} className={styles.hotel}>
            <div className={styles.hotelImage}>
                <img src={photoURL} alt=""  className={styles.image}/>
            </div>
            <div className={styles.hotelDescription}>
                <p className={styles.hotelTitle}>{hotel.hotel_name}</p>
                <p className={styles.hotelAdress}>{hotel.address}</p>
                <p className={styles.hotelPrice}><span>Price per Night:</span> ${hotel.price_per_night} per person</p>
            </div>
        </div>
    )
}