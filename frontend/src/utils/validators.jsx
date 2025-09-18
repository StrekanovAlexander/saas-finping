export function validateEmail(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
};

export function validatePassword(value) {
    return (value && value.length >= 8);
};

export function comparePasswords(password, confirmPassword) {
    return (confirmPassword && confirmPassword === password);
};
