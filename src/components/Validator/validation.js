const validator = require('email-validator');
const emailExistence = require('email-existence');

async function validateEmail(email) {
  const isEmailValid = validator.validate(email);

  if (!isEmailValid) {
    return {
      validSyntax: false,
      validDomain: false,
      validEmail: false,
    };
  }

  const domain = email.split('@')[1];

  return new Promise((resolve, reject) => {
    emailExistence.check(email, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          validSyntax: true,
          validDomain: res,
          validEmail: isEmailValid && res,
        });
      }
    // }, { sender: 'sherykha78687@gmail.com', timeout: 5000 });
    },5000,'sherykhan78687@gmail.com');
  });
}

// Usage example
// const email = 'example@example.com';
// validateEmail(email)
//   .then((result) => {
//     console.log('Email syntax is valid:', result.validSyntax);
//     console.log('Domain is active:', result.validDomain);
//     console.log('Email is active:', result.validEmail);
//   })
//   .catch((err) => {
//     console.error('An error occurred:', err);
//   });
module.exports={validateEmail}