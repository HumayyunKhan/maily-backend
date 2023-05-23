const fs = require('fs');
const httpStatus = require('http-status');
const Checker=require("../../helpers/checker")
const {validateEmail:validate,isSyntaxValid}=require("./validation")



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


async validateSingleMail(req,res){
  try{
    const {email}=req.body
    const result =Checker.validateEmail(email)
    if(!result){
      return res.status(httpStatus.OK).send({success:true,data:{email:email,isvalidDomain:false,isSyntaxValid:false,isEmailValid:false}})
    }
    validate(email).then((result) => {

      console.log(email)
      return res.send({success:true,data:{email:email,isvalidDomain:result.validDomain,isSyntaxValid:result.validSyntax,isEmailValid:result.validEmail}})
    })






  }catch(ex){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({success:false,message:"An error occured on  server side"})
  }
}

}
module.exports=new Validator()