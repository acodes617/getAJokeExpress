//sets the variables to be equal to packages.

const express = require("express");
//instead of having to continuously use the express function you can
//use the variable app
const app = express();
//bodyParser is deprecated so you don't need to focus on this but
//bodyParser is an npm used to process data from an http access.
//think of it as converting!
const bodyParser = require("body-parser");
//requiring MongoDB
const MongoClient = require("mongodb").MongoClient;

var db, collection;

//this is your link to the MONGODB database
const url =
  "mongodb+srv://adocanto:bostoncoder617@savagegangnem.g5xnb.mongodb.net/?retryWrites=true&w=majority";
//this would be the database name!
const dbName = "getAJoke";

//listening to the server on port 3000
app.listen(3000, () => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      //this part is resetting the variable to the client database and connects you to it using the specific database name which is demo
      db = client.db(dbName);
      console.log("Connected to `" + dbName + "`!");
    }
  );
});

//sets the language to ejs
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//this allows you to use all the static pages like the pictures and static files needed to setup the look of the pagee!
app.use(express.static("public"));

//you get the original homepage and post all of the messages into the homepage
app.get("/", (req, res) => {
  db.collection("messages")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.render("index.ejs", { messages: result });
    });
});

//this creates a post request that will save the messages and then redirect you back to the main page so that you can see the posts!
app.post("/messages", (req, res) => {
  db.collection("messages").insertOne(
    { name: req.body.joke, msg: req.body.msg, thumbUp: 0, thumbsDown: 0 },
    (err, result) => {
      if (err) return console.log(err);
      console.log("saved to database");
      res.redirect("/");
    }
  );
});

//here you update the thumbs so that they can
app.put("/messages", (req, res) => {
  db.collection("messages").findOneAndUpdate(
    { name: req.body.joke, msg: req.body.msg },
    {
      $set: {
        thumbUp: req.body.thumbUp + 1,
      },
    },
    {
      sort: { _id: -1 },
      upsert: true,
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});
app.put("/messages2", (req, res) => {
  db.collection("messages").findOneAndUpdate(
    { name: req.body.joke, msg: req.body.msg },
    {
      $set: {
        thumbUp: req.body.thumbUp - 1,
      },
    },
    {
      sort: { _id: -1 },
      upsert: true,
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});

app.delete("/messages", (req, res) => {
  db.collection("messages").findOneAndDelete(
    { name: req.body.joke, msg: req.body.msg },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send("Message deleted!");
    }
  );
});
