const express = require('express')
const app = express()
const cors=require('cors')
const port = process.env.PORT||5001
require('dotenv').config()


app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const addToCartcollection = client.db("userDB").collection("addToCart");


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

app.delete('/products/:id',async(req,res)=>{
     const id= req.params.id;
     const query={_id:new ObjectId(id)}
     const result= await productcollection.deleteOne(query)
     res.send(result)
})


app.get('/products/:id',async (req,res)=>{
     const id=req.params.id;
     const query={_id:new ObjectId(id)}
     const result=await productcollection.findOne(query)
     res.send(result)
})


app.patch('/products/:id',async(req,res)=>{
  const id=req.params.id;
  console.log(id);
  const filter={_id:new ObjectId(id)}
  const options = { upsert: true };
  const product=req.body;
  console.log(product);

  const updatedDoc={
      $set:{
        Name:product. Name,
       Storage:product. Storage,
       Ram:product.Ram,
       price:product.price,
       Bettery:product.Bettery,
       Display:product.Display,
       Camara:product.Camara,
       Status:product.Status,
       image:product.image,
       Category:product.Category,
       imageUrl:product.imageUrl,
      }
  }


  const result=await productcollection.updateOne(filter,updatedDoc,options)
  res.send(result)
    
})





// AddToCartcollections

app.post('/addCartProducts',async (req,res)=>{
     const data=req.body;
    //  console.log(data)
     const result= await addToCartcollection.insertOne(data)
     res.send(result)
})

app.get('/addCartProducts',async(req,res)=>{
      const result=await addToCartcollection.find().toArray()
      res.send(result)
})
 
app.delete('/removeAddToCart/:id',async(req,res)=>{
      const id=req.params.id
      const query= {_id:new ObjectId(id)}
      const result= await addToCartcollection.deleteOne(query)
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