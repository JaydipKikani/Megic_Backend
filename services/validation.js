function getDuplicateErrorMessage(err) {
  if (err.code === 11000 && err.keyPattern && err.keyValue) {
    const keyNames = Object.keys(err.keyPattern); // Extracting the field names causing the duplication
    let errorMessage = "";

    // Constructing the error message based on the duplicated fields
    keyNames.forEach((key, index) => {
      if (index > 0) {
        errorMessage += index === keyNames.length - 1 ? ", and " : ", ";
      }
      errorMessage += `${key} has already been taken`;
    });

    return errorMessage;
  }
}

function requireFieldErrorMessege(err) {
  let errors = "";
  Object.keys(err.errors).forEach((key) => {
    errors = err.errors[key].message;
  });
  return errors;
}

module.exports = { getDuplicateErrorMessage, requireFieldErrorMessege };
