import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  dateOfBirth: Yup.string().required('Date of Birth is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(2, 'Password should be at least 2 characters') // Validate minimum password length
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  // referencePassword: Yup.string().required('Reference Password is required'),
  referencePassword: Yup.string().nullable(), // Make this optional
});
