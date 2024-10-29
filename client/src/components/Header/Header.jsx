import React, { useContext } from 'react';
import styles from './Header.module.css';
import UserContext from '../../context/UserContext';

export default function Header() {
    const { user } = useContext(UserContext);
    let initials = '';
    if (user) {
        console.log(user.full_name); //TODO: Remove
        let firstLetter = user.full_name.slice(0,1);
        let firstLetterSurname = user.full_name.split(' ')[1].slice(0,1);
        initials = firstLetter + firstLetterSurname;
    }
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src="/trip-assistant-logo.png" alt="Trip Assistant Logo" />
                <div className={styles.title}>AI Trip Assistant</div>
            </div>
            <div className={styles.navigation}>
                {user && (
                    <>
                        <a href="/home" className={styles.home}>Home</a>
                        <a href="/my-trips" className={styles.mytrips}>My Trips</a>
                        <a href="" className={styles.logout}>Logout</a>
                        <div className={styles.profile}>{initials}</div>
                    </>
                )}
            </div>
        </div>
    );
}
