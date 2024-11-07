import styles from './FoodRecs.module.css'

export default function FoodRecs({ index, restaurant }) {
    return (
        <div key={index} className={styles.food}>
            <div className={styles.resturantImage}></div>
            <div className={styles.restaurantDescription}>
                <p className={styles.resturantName}>{restaurant.restaurant_name}</p>
                <p className={styles.restaurantAdress}>Address: {restaurant.address}</p>
                <p className={styles.priceRange}><span>Price Range:</span> {restaurant.price_range}</p>
                <p className={styles.cuisineType}><span>Cuisine Type:</span> {restaurant.cuisine_type}</p>
                <p className={styles.openingHours}><span>Opening Hours:</span> {restaurant.opening_hours}</p>
            </div>
        </div>
    )
}