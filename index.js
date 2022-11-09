const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config()
const app = express()
const port =process.env.PORT || 5000


app.use(cors())
app.use(express.json())

 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8uhbkvb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){

    try{
      const serviceCollection = client.db('flyPlane').collection('services')
    //    akekjon to onek ta order dibe tai alada collection create korte hobe
    
      const  reviewsCollection = client.db('flyPlane').collection('reviews')
    
    app.get('/allServices',async(req, res)=>{
        const query ={}
        const cursor = serviceCollection.find(query);
        const services= await cursor.toArray();
        res.send(services)
    })
    app.get('/services',async(req, res)=>{
        const query ={}
        const cursor = serviceCollection.find(query).limit(3);
        const services= await cursor.toArray();
        res.send(services)
    })
    app.get('/services/:id',async(req, res)=>{
        const id = req.params.id
        const query ={_id : ObjectId(id)}
        const service= await serviceCollection.findOne(query);
        res.send(service)
    })
    app.post('/services', async(req, res)=>{
      const services = req.body;
      const result = await serviceCollection.insertOne(services);
      services.id= result.insertedId;
      res.send(result)
  })
  app.get('/reviews',async(req, res)=>{
    const query ={}
    const cursor = reviewsCollection.find(query);
    const reviews= await cursor.toArray();
    res.send(reviews)
})
    app.post('/reviews', async(req, res)=>{
      const reviews = req.body;
      const result = await reviewsCollection.insertOne(reviews);
      reviews.id= result.insertedId;
      res.send(result)
  })
    
    }
    finally{
    
    }
    }
    
    run().catch(error=>console.log(error))

app.get('/', (req, res) => {
  res.send('Welcome to fly-plane for better tour')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



