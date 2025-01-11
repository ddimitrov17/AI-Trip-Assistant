import { useContext, useState } from 'react';
import styles from './Header.module.css';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    let initials = '';

    if (user) {
        let firstLetter = user.full_name.slice(0, 1);
        let firstLetterSurname = user.full_name.split(' ')[1].slice(0, 1);
        initials = firstLetter + firstLetterSurname;
    }

    async function handleLogout(event) {
        event.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                navigate('/');
            } else {
                console.error('Failed to logout:', response.statusText);
            }
        } catch (error) {
            console.error('Error connecting to the logout endpoint:', error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo} onClick={() => navigate('/home')}>
                <img src="/flight.png" alt="Trip Assistant Logo" />
                <div className={styles.title}>AI Trip Assistant</div>
            </div>
            {user && (
                <div className={styles.right}>
                    <div
                        className={`${styles.navigation} ${
                            isMenuOpen ? styles.showMenu : ''
                        }`}
                    >
                        <>
                            <a href="/home" className={styles.home}>Home</a>
                            <a
                                href={`/my-plans/${user.id}`}
                                className={styles.mytrips}
                            >
                                Plans
                            </a>
                            <a
                                href=""
                                onClick={handleLogout}
                                className={styles.logout}
                            >
                                Logout
                            </a>
                        </>
                    </div>
                    <div
                        className={styles.profile}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {initials}
                    </div>
                </div>
            )}
        </div>
    );
}
