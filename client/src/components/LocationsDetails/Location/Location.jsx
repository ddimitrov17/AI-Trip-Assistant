import styles from './Location.module.css'

export default function Location({ locationName, locationDescription, locationImage }) {
    return (
        <section className={styles.locationSection}>
            <img src={locationImage} alt="" className={styles.locationImage}/>
            <h2 className={styles.name}>{locationName}</h2>
            <p className={styles.description}>{locationDescription}</p>
        </section>
    )
}