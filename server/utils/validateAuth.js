const Path = require('path');

const isEmpty = require(Path.join(__dirname, './isEmpty'));

module.exports = (data) => {
  let error = {};

  if (!isEmpty(data)) {
    data.name = !isEmpty(data.name) ? data.name : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (isEmpty(data.name)) {
      error.name = 'Name field is required';
    }

    if (isEmpty(data.password)) {
      error.password = 'Password field is required';
    }
  } else {
    error.name = 'Name field is required';
    error.password = 'Password field is required';
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
