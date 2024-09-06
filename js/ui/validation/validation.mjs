// validation.mjs

/**
 * Validate email format for @stud.noroff.no domain
 * @param {string} email - The email address to validate
 * @returns {boolean} - Returns true if email is valid, false otherwise
 */
export function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  return emailRegex.test(email);
}

/**
 * Validate password length (at least 8 characters)
 * @param {string} password - The password to validate
 * @returns {boolean} - Returns true if password is valid, false otherwise
 */
export function validatePassword(password) {
  return password.length >= 8;
}

/**
 * Validate the registration form
 * @param {string} email - The email address
 * @param {string} password - The password
 * @param {string} name - The user's name
 * @returns {object} - Returns an object with validation status and messages
 */
export function validateRegisterForm(name, email, password) {
  let errors = [];

  if (!name.trim()) {
    errors.push("Name is required.");
  }

  if (!validateEmail(email)) {
    errors.push("Email must be in the format @stud.noroff.no.");
  }

  if (!validatePassword(password)) {
    errors.push("Password must be at least 8 characters long.");
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
}

/**
 * Validate the login form
 * @param {string} email - The email address
 * @param {string} password - The password
 * @returns {object} - Returns an object with validation status and messages
 */
export function validateLoginForm(email, password) {
  let errors = [];

  if (!validateEmail(email)) {
    errors.push("Email must be in the format @stud.noroff.no.");
  }

  if (!validatePassword(password)) {
    errors.push("Password must be at least 8 characters long.");
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
}
