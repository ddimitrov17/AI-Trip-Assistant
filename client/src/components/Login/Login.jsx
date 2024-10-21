import styles from './Login.module.css';

export default function Login() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>

                    <button type="submit" className={styles.submitButton}>Login</button>
                </form>
            </div>
        </div>
    );
}
