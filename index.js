const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;
const cors = require('cors');


//crud-operation
//6GXuHXKjxrOUA6Hw
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://crud-operation:6GXuHXKjxrOUA6Hw@cluster0.dctmt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        
        const listCollection = client.db('crud').collection('list')

        app.get('/list', async (req, res) => {
            const query = {};
            const cursor = listCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        app.post('/list', async (req, res) => {
            const newProduct = req.body
            // console.log(newProduct);
            const result = await listCollection.insertOne(newProduct)
            res.send(result)
        })

        app.delete('/list/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await listCollection.deleteOne(query);
            res.send(result);
        });

        app.put('/list/:id', async (req, res) => {
            const id = req.params.id;
            const updatUser = req.body;
            console.log(updatUser);
            const filter = { _id: ObjectId(id) }
            const option = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updatUser.name,
                    price: updatUser.price


                }
            };
            const result = await listCollection.updateOne(filter, updateDoc, option)
            res.send(result);
        });

    } finally {

    }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send('Running my  server')
})

app.listen(port, () => {
    console.log(' server is running ');
})
