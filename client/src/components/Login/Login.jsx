import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import styles from './Login.module.css';
import {loginValidationSchema} from '../../validation/validationSchemas';

export default function Login() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(values),
                });
                if (!response.ok) {
                    throw new Error();
                }
                navigate('/home');
            } catch (error) {
                console.error('There was a problem with the login:', error);
            }
        }
    });

    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={formik.handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className={styles.error}>{formik.errors.username}</div>
                        ) : null}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className={styles.error}>{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <button type="submit" className={styles.submitButton}>Login</button>
                </form>
            </div>
        </div>
    );
}