const express=require('express')
const router=express.Router()
const Validator=require("./validator.contoller")
const {Upload:upload}=require("../../helpers/upload")
router.post('/validateEmails',upload.single('file'),(req,res)=>{
    Validator.readEmailsFromCSV(req,res)

})   

module.exports={router}