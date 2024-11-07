import styles from './Hotel.module.css'

export default function Hotel({ hotel, index }) {
    return (
        <div key={index} className={styles.hotel}>
            <div className={styles.hotelImage}></div>
            <div className={styles.hotelDescription}>
                <p className={styles.hotelTitle}>{hotel.hotel_name}</p>
                <p className={styles.hotelAdress}>{hotel.address}</p>
                <p className={styles.hotelPrice}><span>Price per Night:</span> ${hotel.price_per_night} per person</p>
            </div>
        </div>
    )
}