import * as Yup from 'yup';

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

export const validationMobile =Yup.object().shape({
    number: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')  // Ensure 10 digits
      .required('Mobile number is required'),
  });

export const validatePassword =  Yup.object().shape({
    password: Yup.string()
      .min(2, 'Password must be at least 2 characters')
      .required('Password is required'),
  });

export const validateOTP = Yup.object().shape({
    otp: Yup.array()
      .of(
        Yup.string()
          .min(1, 'Each OTP digit is required')
          .required('Each OTP digit is required')
      )
      .required('OTP is required'),
  });




  