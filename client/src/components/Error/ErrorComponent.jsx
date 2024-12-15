import { useEffect, useState } from 'react';
import styles from './ErrorComponent.module.css';

export default function ErrorComponent({ errorMessage }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => clearTimeout(timer); 
    }, []);

    if (!isVisible) {
        return; 
    }

    return (
        <div className={styles.error}>
            <span>{errorMessage}</span>
        </div>
    );
}
