(function (root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if (typeof exports === 'object')
    exports['MyModule'] = factory();
  else
    root['MyModule'] = factory();
}(typeof window !== 'undefined' ? window : this, function () {
  // checking the first name and last name
  const isNameValid = (fName, lName) => {
    return (
      fName.length > 1 &&
      fName.length < 50 &&
      lName.length > 1 &&
      lName.length < 50
    );
  };

  // checking the email and the verify email if the same
  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isVerifyEmailValid = (email, verifyEmail) => {
    return email === verifyEmail;
  };

  // checking the password
  const isPasswordValid = (password) => {
    return password.length >= 8 && password.length <= 128;
  };

  // checking the if selected valid country
  const isCountryValid = (country) => {
    return country !== 'Country';
  };

  // city, state and address are same validation rule
  const isAddressValid = (city, state, address) => {
    return (
      city.length >= 1 &&
      city.length <= 128 &&
      state.length >= 1 &&
      state.length <= 128 &&
      address.length >= 1 &&
      address.length <= 128
    );
  };

  const isTermChecked = (chkTerm) => {
    return chkTerm;
  };

  // In Upload.js
  function isModelValid(model) {
    return model !== 'Choose model'
  }

  function isSellerValid(seller) {
    return seller !== 'Choose seller'
  }

  return {
    isNameValid: isNameValid,
    isEmailValid: isEmailValid,
    isVerifyEmailValid: isVerifyEmailValid,
    isPasswordValid: isPasswordValid,
    isCountryValid: isCountryValid,
    isAddressValid: isAddressValid,
    isTermChecked: isTermChecked,
    isModelValid: isModelValid,
    isSellerValid: isSellerValid
  };
}));
