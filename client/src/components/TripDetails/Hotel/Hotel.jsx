import { useEffect, useState } from 'react';
import styles from './Hotel.module.css'
import { GetPlaceDetails } from '../../../services/photo.api';

export default function Hotel({ hotel, index }) {
    return (
        <div key={index} className={styles.hotel}>
            <div className={styles.hotelImage}>
                <img src={hotel.locationImage} alt=""  className={styles.image}/>
            </div>
            <div className={styles.hotelDescription}>
                <p className={styles.hotelTitle}>{hotel.hotel_name}</p>
                <p className={styles.hotelAdress}>{hotel.address}</p>
                <p className={styles.hotelPrice}><span>Price per Night:</span> ${hotel.price_per_night} per person</p>
            </div>
        </div>
    )
}