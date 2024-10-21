import React from 'react';
import styles from './Header.module.css';

export default function Header() {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src="/trip-assistant-logo.png" alt="Trip Assistant Logo" />
                <div className={styles.title}>AI Trip Assistant</div>
            </div>
        </div>
    )
}