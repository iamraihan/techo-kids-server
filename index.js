const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
// const { config } = require("dotenv");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

//username = techo-kids
// pass = PBjV1uGbYS2RgEsw

//Middleware
app.use(cors());
app.use(express.json());
// const uri = 'mongodb://mongo:lvd9wTLr6NjeSrR1xGiC@containers-us-west-31.railway.app:6766'

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.5wn8ndj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// client.connect((err) => {
//   const collection = client.db("teacher-collection").collection("teachers");
//   console.log("connected");
//   // perform actions on the collection object
//   client.close();
// });
async function run() {
  try {
    await client.connect();
    const teacherCollection = client
      .db("teacher-collection")
      .collection("teachers");

    app.put("/teacher/:email", async (req, res) => {
      const email = req.params.email;
      const teacher = req.body;
      console.log("teacher", teacher);
      console.log(email);
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: teacher,
      };
      const result = await teacherCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      return res.send({ result });
    });
    app.get("/students", async (req, res) => {
      // const query = {};
      const filter = { category: "student" };
      const cursor = teacherCollection.find(filter);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
