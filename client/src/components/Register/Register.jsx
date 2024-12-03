import { useState } from 'react';
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {registerValidationSchema} from '../../validation/validationSchemas';

export default function Register() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            fullName: '',
            password: '',
            repeat_password: ''
        },
        validationSchema: registerValidationSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
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
                console.error('There was a problem with the signup:', error);
            }
        }
    });

    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={formik.handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className={styles.error}>{formik.errors.email}</div>
                        ) : null}
                    </div>

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
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullName}
                        />
                        {formik.touched.fullName && formik.errors.fullName ? (
                            <div className={styles.error}>{formik.errors.fullName}</div>
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

                    <div className={styles.inputGroup}>
                        <label htmlFor="repeatPassword">Repeat Password</label>
                        <input
                            type="password"
                            id="repeatPassword"
                            name="repeat_password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.repeat_password}
                        />
                        {formik.touched.repeat_password && formik.errors.repeat_password ? (
                            <div className={styles.error}>{formik.errors.repeat_password}</div>
                        ) : null}
                    </div>

                    <button type="submit" className={styles.submitButton}>Create an account</button>
                </form>
            </div>
        </div>
    );
}