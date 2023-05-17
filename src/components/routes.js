const express=require("express")
const {router:validatorRouter}=require("./Validator/validator.routes")
const router=express.Router()

router.get("/",(req,res)=>{
    try{
res.send("ROUTES HERE")
    }catch(error){
res.send('ERROR OCCURED')
    }
})
router.use('/validator',validatorRouter)
module.exports=router