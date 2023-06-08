import { toast } from "react-hot-toast";

// Validate Login page username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
  return errors;
}

// Validate password
export async function passwordValidate(values) {
  const errors = passwordVerify(values);
  return errors;
}
// Validate Reset password
export async function resetPasswordValidation(values) {
  const errors = passwordVerify(values);
  if(values.password !==  values.confirm_pwd){
    errors.exist = toast.error('Password not match ...!')
  }
  return errors;
}

// Validate Register Form 
export async function registerValidation(values) {
  const errors = usernameVerify(values);
  passwordVerify(errors, values);
  emailVerify(errors, values); 
  return errors;
}

// Validate profile page
export async function profileValidation(values) {
  const errors = emailVerify(values);
  return errors;
}



// Verify password
function passwordVerify(values) {
  const errors = {};
  const specialChars =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;

  if (!values.password) {
    errors.password = "Password Required...!";
    toast.error(errors.password);
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password...!";
    toast.error(errors.password);
  } else if (values.password.length < 4) {
    errors.password = "Password must be at least 4 characters";
    toast.error(errors.password);
  } else if (!specialChars.test(values.password)) {
    errors.password = ` At least one lowercase letter
                        At least one uppercase letter
                        At least one digit
                        At least one special character
                        Allowed characters include uppercase letters, lowercase letters, digits, and the specified special characters 
                        Minimum length of 4 characters`;
    toast.error(errors.password);
  }

  return errors;
}

// Validate username
function usernameVerify(values) {
  const errors = {};

  if (!values.username) {
    errors.username = "Username Required...!";
    toast.error(errors.username);
  } else if (values.username.includes(" ")) {
    errors.username = "Invalid username...!";
    toast.error(errors.username);
  }

  return errors;
}

// Validate email
function emailVerify(values) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const error = {};
  if (!values.email){
    error.email = "Invalid email"
    toast.error = error.email
  } else if(values.email.includes(' ')){
    error.email = "Wrong email..!";
  } else if (!emailRegex.test(values.email)){
    error.email = "Invalid email address..!"
    toast.error = error.email
  }
  return error;
}
