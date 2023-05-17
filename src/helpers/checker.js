class Checker{
    validateEmail(email) {
        // You can add your email validation logic here
        // This is a basic email validation pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      }
}
module.exports= new Checker()