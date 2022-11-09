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
    
      const  addNewServicesCollection = client.db('flyPlane').collection('newServices')
    
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
    
    //  newServices api 
    app.get('/newServices',async(req, res)=>{
       const query ={}
        const cursor = addNewServicesCollection.find(query);   
        const newService = await cursor.toArray();
        res.send(newService)
    })

    app.get('/newServices/:id',async(req, res)=>{
      const id = req.params.id
      const query ={_id : ObjectId(id)}
      const newService= await addNewServicesCollection.findOne(query);
      res.send(newService)
  })
    app.post('/newServices', async(req, res)=>{
        const newService = req.body;
        const result = await addNewServicesCollection.insertOne(newService);
        newService.id= result.insertedId;
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



