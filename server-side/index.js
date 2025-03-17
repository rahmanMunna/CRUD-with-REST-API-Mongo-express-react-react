const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = "mongodb+srv://habiburmunna50:<db_password>@cluster0.txvs5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = 'mongodb://localhost:27017/'

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const userCollection = client.db('userDB').collection('userCollection');

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        app.post('/users', async (req, res) => {
            const user = req.body;

            //insert in db
            const result = await userCollection.insertOne(user);

            //send response to client-side
            res.send(result);
        })

        //read all data from mongo and send to client-side
        app.get('/users', async (req, res) => {
            const cursor = await userCollection.find();
            const result = await cursor.toArray();

            res.send(result)
        })
        app.delete('/users/:id', async (req, res) => {
            console.log('Delete api is hitting');
            const id = req.params.id;

            const query = { _id: new ObjectId(id) }
            const result = await userCollection.deleteOne(query);

            res.send(result);
        })

        //This HTTP API will send  a specific data
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;

            //searching query
            const query = { _id: new ObjectId(id) }
            const cursor = await userCollection.findOne(query);
            // const result = await cursor.toArray();
            res.send(cursor);
        })

        //Update data by PUT API
        app.put('/user/:id', async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            console.log(id);
            console.log(updatedUser?.email);

            //filter to find the data
            const filter  = {_id : new ObjectId(id)};
            const options = {upsert : true};

            const updatedDoc = {
                $set : {
                    email : updatedUser.email,
                    phoneNumber : updatedUser.phoneNumber
                },
            }

            const result = await userCollection.updateOne(filter,updatedDoc,options);
            res.send(result);
            // console.log(result);

        })






        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.log(error)
    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is running');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})