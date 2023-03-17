import * as yup from 'yup'

export const loginSchema = yup.object({
    username: yup.string().min(3, "must be at least 3 characters").max(20, "must be 20 characters or less").required("required"),
    password: yup.string().min(6, "Minimum 6 characters with 1 uppercase letter, 1 lowercase letter and 1 number").lowercase(1, "Minimum 6 characters with 1 uppercase letter, 1 lowercase letter and 1 number").uppercase("Minimum 6 characters with 1 uppercase letter, 1 lowercase letter and 1 number").required('Required')
});

// export const registerSchema = yup.object({
//   registerusername: yup.string().min(3, "must be at least 3 characters").max(20, "must be 20 characters or less").required("required"),
//   registerpassword: yup.string().min(6, "Minimum 6 characters with 1 uppercase letter, 1 lowercase letter and 1 number").lowercase(1, "Minimum 6 characters with 1 uppercase letter, 1 lowercase letter and 1 number").uppercase("Minimum 6 characters with 1 uppercase letter, 1 lowercase letter and 1 number").required('required'),
//   confirmpassword: yup.string().required("required"),
//   useremail: yup.string().email("Please enter a valid email").required("required")
// });

// export const registerSchema = yup.object({
//   registerusername: yup.string().min(3, "must be at least 3 characters").max(20, "must be 20 characters or less").required("required"),
//   registerpassword: yup.string().min(6, "Minimum 6 characters with 1 uppercase letter, 1 lowercase letter and 1 number").lowercase(1, "Minimum 6 characters with 1 uppercase letter, 1 lowercase letter and 1 number").uppercase("Minimum 6 characters with 1 uppercase letter, 1 lowercase letter and 1 number").required('required'),
//   confirmpassword: yup.string().required("required").oneOf([yup.ref('registerpassword')], "passwords must match"),
//   useremail: yup.string().email("Please enter a valid email").required("required")
// });

export const registerSchema = yup.object({
  registerusername: yup.string().min(3, "must be at least 3 characters").max(20, "must be 20 characters or less").required("required"),
  registerpassword: yup.string().min(6, "Minimum 6 characters with 1 uppercase letter, 1 lowercase letter and 1 number").lowercase(1, "Minimum 6 characters with 1 uppercase letter, 1 lowercase letter and 1 number").uppercase("Minimum 6 characters with 1 uppercase letter, 1 lowercase letter and 1 number").required('required'),
  confirmpassword: yup.string()
  .required("required")
  .when("password", {
    is: password => (password && password.length > 0 ? true : false),
    then: yup.string().oneOf([yup.ref("password")], "Password doesn't match")
  }),
  useremail: yup.string().email("Please enter a valid email").required("required")
});

export const createListingSchema = yup.object({
  farmstandName: yup.string().min(3, "must be at least 3 characters").max(30, "must be 30 characters or less").required("required"),
});

export const addImagesSchema = yup.object({
  image: yup.mixed().required("Add 1 or more images")
})

export const profileSchema = yup.object({
  newUsername: yup.string().min(3, "must be at least 3 characters").max(20, "must be 20 characters or less"),
  newUserpassword: yup.string().min(6, "Minimum 6 characters with 1 uppercase letter, 1 lowercase letter and 1 number").lowercase(1, "Minimum 6 characters with 1 uppercase letter, 1 lowercase letter and 1 number").uppercase("Minimum 6 characters with 1 uppercase letter, 1 lowercase letter and 1 number").required('Required'),
  oldUserpassword: yup.string().min(6, "Minimum 6 characters with 1 uppercase letter, 1 lowercase letter and 1 number").lowercase(1, "Minimum 6 characters with 1 uppercase letter, 1 lowercase letter and 1 number").uppercase("Minimum 6 characters with 1 uppercase letter, 1 lowercase letter and 1 number").required('Required'),
  newUseremail: yup.string().email("Please enter a valid email")
});