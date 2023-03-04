import * as yup from 'yup'

export const loginSchema = yup.object({
    username: yup.string().min(3, "must be at least 3 characters").max(20, "must be 20 characters or less").required("required"),
    password: yup.string().min(5).required("required")
});

export const registerSchema = yup.object({
  username: yup.string().min(3, "must be at least 3 characters").max(20, "must be 20 characters or less").required("required"),
  password: yup.string().min(5).required("required"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], "passwords must match").required("required"),
  useremail: yup.string().email("Please enter a valid email").required("required")
});

export const createListingSchema = yup.object({
  farmstandName: yup.string().min(3, "must be at least 3 characters").max(30, "must be 30 characters or less").required("required"),
});

export const addImagesSchema = yup.object({
  image: yup.mixed().required("Add 1 or more images")
})