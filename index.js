const express = require('express')
const app = express()
const cors=require('cors')
const port = process.env.PORT||5001


app.use(cors())
app.use(express.json())




app.post('/users',(req,res)=>{
    const user=req.body;
    console.log(user)
})







app.get('/',(req,res)=>{
    res.send('mobile-store-server is running....')
})



app.listen(port, () => {
  console.log(`This server is going on port : ${port}`)
})