const isValidPassword = (password) => {
    // Minimum 8 characters
    if (password.length < 8) {
        return false;
    }

    // At least one lowercase character
    if (!/[a-z]/.test(password)) {
        return false;
    }

    // At least one number, symbol, or whitespace character
    if (!/[0-9!@#$%^&*()-_+=<>?/{}[\]|\s]/.test(password)) {
        return false;
    }

    return true;
};

module.exports = {
    isValidPassword,
};
