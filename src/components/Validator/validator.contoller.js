const fs = require('fs');


class Validator{

 readEmailsFromCSV(filePath) {
  const fileData = fs.readFileSync(filePath, 'utf8');
  const lines = fileData.split('\n');

  const emails = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line !== '') {
      const email = line.split(';')[0].trim();
      if (validateEmail(email)) {
        emails.push(email);
      }
    }
  }

  return emails;
}
 validateEmail(email) {
  // You can add your email validation logic here
  // This is a basic email validation pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Usage example
// const filePath = 'path/to/your/file.csv';
// const emails = readEmailsFromCSV(filePath);
// console.log(emails);

}