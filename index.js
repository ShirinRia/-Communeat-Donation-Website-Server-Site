// var jwt = require('jsonwebtoken');
const {
  MongoClient,
  ServerApiVersion,
  ObjectId
} = require('mongodb');
const express = require('express')
var cors = require('cors')
require('dotenv').config()
var app = express()

// app.use(cors())
app.use(cors({
  origin: ['http://localhost:5173'],
  // origin: '*',
  credentials: true
  // optionSuccessStatus: 200
}
// corsOptions
))
app.use(express.json())
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

USERNAME = process.env.S3_BUCKET
PASS = process.env.SECRET_KEY
const uri = `mongodb+srv://${USERNAME}:${PASS}@cluster0.xrp2z6o.mongodb.net/?retryWrites=true&w=majority`;

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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const foodcollection = client.db("food").collection("fooddata");
   
    // add new product to database
    app.post('/newfood', async (req, res) => {
      const newfood = req.body
      console.log(newfood)
      const result = await foodcollection.insertOne(newfood);
      res.send(result)
    })
   
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({
    //   ping: 1
    // });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})