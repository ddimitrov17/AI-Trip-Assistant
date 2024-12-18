import { useEffect, useState } from 'react';
import { GetPlaceDetails } from '../../../services/photo.api';
import styles from './PlaceToVisit.module.css'

export default function PlaceToVisit({ index, place,location }) {
    return (
        <div key={index} className={styles.place}>
            <div className={styles.placeImage}>
                <img src={place.locationImage} alt="" className={styles.placeImageElement} />
            </div>
            <div className={styles.placeDescription}>
                <p className={styles.placeTitle}>{place.place_name}</p>
                <p className={styles.placeExplanation}>{place.description}</p>
                <p className={styles.placePrice}><span>Ticket Price:</span> ${place.ticket_pricing} per person</p>
            </div>
        </div>
    )
}