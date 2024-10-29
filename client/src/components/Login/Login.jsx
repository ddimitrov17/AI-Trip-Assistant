import { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    function changeFromHandler(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    async function loginSubmitHandler(e) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData), 
            });

            if (!response.ok) {
                throw new Error();
            }
            console.log('Login successful!'); //TODO: Remove this
            navigate('/home');
        } catch (error) {
            console.error('There was a problem with the login:', error);
        }
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={loginSubmitHandler}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required onChange={changeFromHandler} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required onChange={changeFromHandler} />
                    </div>

                    <button type="submit" className={styles.submitButton}>Login</button>
                </form>
            </div>
        </div>
    );
}
