const fs = require('fs');
const httpStatus = require('http-status');
const Checker=require("../../helpers/checker")
const {validateEmail:validate}=require("./validation")


class Validator{

 async readEmailsFromCSV(req,res) {
  try{
  const filePath=req.file.path
  if(!filePath)return res.status(httpStatus.CONFLICT).send({success:false,message:"No file specified"})
  const fileData = fs.readFileSync(filePath, 'utf8');
  console.log(fileData)
  const lines = fileData.split('\n');

  const emails = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line !== '') {
      const email = line.split(',')[4].trim();
      console.log(email,"-------------------")
      if (Checker.validateEmail(email)) {
        validate(email).then((result) => {
    console.log('Email syntax is valid:', result.validSyntax);
    console.log('Domain is active:', result.validDomain);
    console.log('Email is active:', result.validEmail);
  })
  .catch((err) => {
    console.error('An error occurred:', err);
  });
        emails.push(email);
      }
    }
  }

  return res.status(httpStatus.OK).send({success:true,message:"specified emails successfully validated",data:emails});
}catch(ex){
  console.log(ex)
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({success:false,message:"An error occured on server side"})
}
}
//  validateEmail(email) {
//   console.log(email,"---Email")
//   // You can add your email validation logic here
//   // This is a basic email validation pattern
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailPattern.test(email);
// }

// Usage example
// const filePath = 'path/to/your/file.csv';
// const emails = readEmailsFromCSV(filePath);
// console.log(emails);

}
module.exports=new Validator()