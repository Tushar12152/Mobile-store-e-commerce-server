const express = require('express')
const app = express()
const cors=require('cors')
const port = process.env.PORT||5001
require('dotenv').config()


app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tgzt8q2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
    try {

// Database collections

    const UserCollection = client.db("userDB").collection("users");
    const productcollection = client.db("userDB").collection("products");


// users collections

app.post('/users', async(req,res)=>{
    const user=req.body;
    const result= await UserCollection.insertOne(user)
    res.send(result)
})


app.get('/users',async(req,res)=>{
  const result=await UserCollection.find().toArray()
  res.send(result)
})



// ProductCollections

app.post('/products', async(req,res)=>{
  const product=req.body;
  // console.log(product)
  const result= await productcollection.insertOne(product)
  res. send(result)
})

app.get('/products', async(req,res)=>{
    const result= await productcollection.find().toArray()
    res.send(result)

})








    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('mobile-store-server is running....')
})



app.listen(port, () => {
  console.log(`This server is going on port : ${port}`)
})