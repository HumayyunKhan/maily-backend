const express=require("express")
const Router=express.Router()
const {router:validationRouter}=require("./src/components/Validator/validator.routes")
Router.use('/validator',validationRouter)

module.exports={Router}