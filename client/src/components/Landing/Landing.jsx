import styles from './Landing.module.css';

export default function Landing() {
    return (
        <div className={styles.landingContainer}>
            <div className={styles.titleContent}>
                <h1>Discover Your Next Adventure with AI</h1>
                <h4>Your Journey, Our Expertise</h4>
                <p>Let our AI-powered assistant help you create a customized travel experience that suits your preferences. Whether you're looking for exotic destinations, local gems, or budget-friendly options.</p>
                <a href="login">Log in to your account</a>
                <p className='already-account'>Don't have an account? You can sign up from <span><a href="signup">here.</a></span></p>
            </div>
        </div>
    )
}