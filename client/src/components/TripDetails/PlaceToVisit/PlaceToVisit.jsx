import styles from './PlaceToVisit.module.css'

export default function PlaceToVisit({ index, place }) {
    return (
        <div key={index} className={styles.place}>
            <div className={styles.placeImage}></div>
            <div className={styles.placeDescription}>
                <p className={styles.placeTitle}>{place.place_name}</p>
                <p className={styles.placeExplanation}>{place.description}</p>
                <p className={styles.placePrice}><span>Ticket Price:</span> ${place.ticket_pricing} per person</p>
            </div>
        </div>
    )
}