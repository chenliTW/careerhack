const express = require('express')
const app = express()
const port = 8300

const mongoose=require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); 

mongoose.connect("mongodb+srv://mongodb:mongodb@mongodb-svc.default.svc.cluster.local/?replicaSet=mongodb&ssl=false");

var Record = new mongoose.Schema({
    location: String,
    timestamp: String,
    signature: String,
    material: Number,
    a: Number,
    b: Number,
    c: Number,
    d: Number
});
var records = mongoose.model('records', Record);

var Report = new mongoose.Schema({
    location: String,
    date: String,
    count: Number,
    material: Number,
    a: Number,
    b: Number,
    c: Number,
    d: Number
});
var reports = mongoose.model('reports', Report);

app.post('/api/records', (req, res) => {
    records.create({
        location: req.body["location"],
        timestamp: req.body["timestamp"],
        signature: req.body["signature"],
        material: req.body["material"],
        a: req.body["a"],
        b: req.body["b"],
        c: req.body["c"],
        d: req.body["d"]
    }, (err) => {
        if (err) {
            res.json({success:false});
        } else {
            res.json({success:true});
        }
    });
})

app.get('/api/records', (req, res) => {
    records.find({location: req.query["location"],timestamp:{$regex:`^${req.query["date"]}`}}, (err, records) => {
        if (err) {
            res.json([]);
        } else {
            res.json(records);
        }
    });
})

app.get('/api/report', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/clean', (req, res) => {
    res.send('Hello World!')
})

app.get("api/health", (req, res) => {
    res.json({status: "ok"});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})