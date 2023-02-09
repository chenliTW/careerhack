const express = require('express')
const app = express()
const port = 8300

const mongoose=require('mongoose');
const cachegoose = require('recachegoose');

cachegoose(mongoose, {
    engine: 'memory'
});

const bodyParser = require('body-parser');
//const compression = require('compression')

//app.use(compression())
app.use(bodyParser.json()); 

mongoose.connect("mongodb+srv://mongodb:mongodb@mongodb-svc.default.svc.cluster.local/admin?replicaSet=mongodb&ssl=false");

var Record = new mongoose.Schema({
    location: { type: String, index: true },
    timestamp: { type: String, index: true },
    signature: String,
    material: Number,
    a: Number,
    b: Number,
    c: Number,
    d: Number
});
Record.index({location: 1, timestamp: 1});
var records = mongoose.model('records', Record);

/*var Report = new mongoose.Schema({
    location: { type: String, index: true },
    date: { type: String, index: true },
    count: Number,
    material: Number,
    a: Number,
    b: Number,
    c: Number,
    d: Number
});
var reports = mongoose.model('reports', Report);*/

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
            cachegoose.clearCache('cache');
            res.json({success:true});
        }
    });
})

app.get('/api/records', (req, res) => {
    records.find({location: req.query["location"],timestamp:{$regex:`^${req.query["date"]}`}},'-_id -__v').cache(300,'cache').exec((err, records) => {
        if (err) {
            res.json([]);
        } else {
            res.json(records);
        }
    });
})

app.get('/api/report', (req, res) => {
    records.find({location: req.query["location"],timestamp:{$regex:`^${req.query["date"]}`}},'-_id -__v').cache(300,'cache').exec((err, records) => {
        if (err) {
            res.json([]);
        } else {
            let A=0,B=0,C=0,D=0;
            for (let i=0;i<records.length;i++) {
                A+=records[i].a;
                B+=records[i].b;
                C+=records[i].c;
                D+=records[i].d;
            }
            res.json({location: req.query["location"],
                    date: req.query["date"],
                    count: records.length,
                    material: 0,
                    a: A,
                    b: B,
                    c: C,
                    d: D});
        }
    });
})

app.get('/api/clean', (req, res) => {
    records.deleteMany({}).exec((err) => {
        if (err) {
            res.json({success:false});
        } else {
            cachegoose.clearCache('cache');
            res.json({success:true});
        }
    });
})

app.get("api/health", (req, res) => {
    res.json({status: "ok"});
})

process.on('SIGINT', function() {
    mongoose.connection.close().then(function(err) {
      process.exit(err ? 1 : 0);
    });
 });

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})