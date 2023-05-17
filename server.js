const express=require("express")
require('dotenv').config()
const routes=require("./src/components/routes")
const app=express()
app.use(express.json())
const port=process.env.SERVER_PORT||3000
app.listen(port)
app.get('/',(req,res)=>{
    res.send("WELCOME TO MAILY SERVER")   
})

app.use('/maily',routes)

console.log(`server running on http://localhost:${port}`)
