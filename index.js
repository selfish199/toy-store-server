const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.json());
app.use(cors());

// mongo

const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.uya6aoa.mongodb.net/?retryWrites=true&w=majority`;

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
    await client.connect();

    const toysStoreData = client.db('toystore').collection('toys');


    app.post('/alltoys', async (req, res) => {
        const toys = req.body;
        console.log(toys)
        const result = await toysStoreData.insertOne(toys);
        res.send(result)
      })

      app.get('/alltoys', async (req, res) => {
        const result = await toysStoreData.find().toArray()
        res.send(result)
      })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// mongo finish





app.get('/', (req, res) => {
    res.send('toy store is running');
  })
  
  app.listen(port, () => {
    console.log(`toy store is running on port${port}`)
  })