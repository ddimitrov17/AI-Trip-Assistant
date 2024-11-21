import { useContext } from 'react';
import styles from './Header.module.css';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    let initials = '';
    if (user) {
        let firstLetter = user.full_name.slice(0, 1);
        let firstLetterSurname = user.full_name.split(' ')[1].slice(0, 1);
        initials = firstLetter + firstLetterSurname;
    }

    async function handleLogout(event) {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/auth/logout`, {
                credentials: 'include'
            });
            const data = await response.json();
            console.log(data)
            navigate('/');
        } catch (error) {
            console.error('Error connecting to the logout endpoint:', error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo} onClick={() => {navigate('/home')}}>
                <img src="/trip-assistant-logo.png" alt="Trip Assistant Logo" />
                <div className={styles.title}>AI Trip Assistant</div>
            </div>
            <div className={styles.navigation}>
                {user && (
                    <>
                        <a href="/home" className={styles.home}>Home</a>
                        <a href={`/my-plans/${user.id}`} className={styles.mytrips}>Plans</a>
                        <a href="" onClick={handleLogout} className={styles.logout}>Logout</a>
                        <div className={styles.profile}>{initials}</div>
                    </>
                )}
            </div>
        </div>
    );
}
