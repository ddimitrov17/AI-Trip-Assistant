import styles from './Register.module.css';

export default function Register() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="repeatPassword">Repeat Password</label>
                        <input type="password" id="repeatPassword" name="repeatPassword" required />
                    </div>

                    <button type="submit" className={styles.submitButton}>Create an account</button>
                </form>
            </div>
        </div>
    );
}
