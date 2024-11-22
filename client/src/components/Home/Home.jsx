import styles from './Home.module.css'

export default function Home() {
    return (
        <div className={styles.homeContainer}>
            <div className="generate-trip">
                <h2>Plan a trip</h2>
                <p>Need help planning your next adventure? Let our AI-powered assistant give you accommodation,food and tourist recommendations that are matching your preferences and budget!</p>
                <a href="/trip-generator">Start planning your trip now</a>
            </div>
            <div className="generate-location">
                <h2>Can't decide on a destination?</h2>
                <p>Get exciting destination suggestions tailored to your interests, budget, and travel dates.</p>
                <a href="/location-suggestions">Let us recommend</a>
            </div>
            <div className="schedule-trip">
                <h2>Already made some plans for a trip but want to make the most of it?</h2>
                <p>We will create an approximate schedule of what to do during your stay in a certain location, helping you maximize your time and experiences.</p>
                <a href="/trip-scheduler">Create a detailed schedule</a>
            </div>
        </div>

    )
}