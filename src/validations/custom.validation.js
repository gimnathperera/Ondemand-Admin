const moment = require('moment');

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const mobile = (value, helpers) => {
  if (
    !value.match(/(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g)
  ) {
    return helpers.message('"{{#label}}" must be a valid phone number');
  }
  return value;
};

const dob = (value, helpers) => {
  const diff = moment(value).diff(moment(), 'milliseconds');
  const duration = String(moment.duration(diff).years()).replace('-', '');

  if (Number(duration) < 18) {
    return helpers.message('age must be at least 18 years');
  }

  return value;
};

module.exports = {
  objectId,
  password,
  dob,
  mobile,
};
