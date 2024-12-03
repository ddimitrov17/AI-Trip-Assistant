// client/src/validationSchemas.js
import * as yup from 'yup';

export const registerValidationSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    username: yup.string().required('Username is required'),
    fullName: yup.string().required('Full name is required'),
    password: yup.string().required('Password is required'),
    repeat_password: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Repeat password is required')
});

export const loginValidationSchema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
});