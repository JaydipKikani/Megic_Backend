function getDuplicateErrorMessage(error) {
  const keyNames = Object.keys(error.keyPattern); // Extracting the field names causing the duplication
  let errorMessage = "Duplicate entry for ";

  // Constructing the error message based on the duplicated fields
  keyNames.forEach((key, index) => {
    if (index > 0) {
      errorMessage += index === keyNames.length - 1 ? ", and " : ", ";
    }
    errorMessage += `${key}: '${error.keyValue[key]}'`;
  });

  return errorMessage;
}

module.exports = getDuplicateErrorMessage;
