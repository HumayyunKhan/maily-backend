const express=require("express")
const routes=require("./src/components/routes")
const app=express()
app.use(express.json())
app.listen(3000)
app.get('/',(req,res)=>{
    res.send("WELCOME TO MAILY")
})

app.use('/maily',routes)

console.log("server running on http://localhost:3000")
