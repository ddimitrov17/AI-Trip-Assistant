import { useState } from 'react';
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        fullName: '',
        password: '',
        repeat_password: ''
    });

    function changeHandler(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function signUpSubmitHandler(e) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
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
            console.log('Sign up successful!'); //TODO: Remove this
            navigate('/home');
        } catch (error) {
            console.error('There was a problem with the signup:', error);
        }
    };
    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={signUpSubmitHandler}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required onChange={changeHandler} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required onChange={changeHandler} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" name="fullName" required onChange={changeHandler} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required onChange={changeHandler} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="repeatPassword">Repeat Password</label>
                        <input type="password" id="repeatPassword" name="repeat_password" required onChange={changeHandler} />
                    </div>

                    <button type="submit" className={styles.submitButton}>Create an account</button>
                </form>
            </div>
        </div>
    );
}
