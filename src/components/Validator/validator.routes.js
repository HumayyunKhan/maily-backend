const express=require('express')
const router=express.Router()
const {Upload:upload}=require("../../helpers/upload")
router.post('/validateEmails',upload.single('file'),(req,res)=>{
    console.log("hello")
    res.send('WELCOME TO DASHBOARD')
})   

module.exports={router}