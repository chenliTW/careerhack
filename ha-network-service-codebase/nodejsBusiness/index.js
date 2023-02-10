const express = require('express')
const app = express()
const port = 8100

const bodyParser = require('body-parser');
app.use(bodyParser.json()); 

require('es6-promise').polyfill();
const fetch = require('node-fetch');
var fetch_retry = require('fetch-retry')(fetch);
const request = require('request');
var timeout = require('connect-timeout'); //express v4


app.post('/api/order', (req, res) => {
    res.json({success:true});
    fetch_retry(`${process.env.INVENTORY_URL}/material`,{
        method: 'POST',
        compress: true,
        body: JSON.stringify({a: req.body["data"]["a"],
        b: req.body["data"]["b"],
        c: req.body["data"]["c"],
        d: req.body["data"]["d"]}),
        retries: 100,
        retryDelay: 3000,
        headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
        response.json().then(
            (data) => {
                let newRecord={
                    location: req.body["location"],
                    timestamp: req.body["timestamp"],
                    signature: data["signature"],
                    material: data["material"],
                    a: req.body["data"]["a"],
                    b: req.body["data"]["b"],
                    c: req.body["data"]["c"],
                    d: req.body["data"]["d"]
                }
                fetch_retry(`${process.env.STORAGE_URL}/records`,{
                    method: 'POST',
                    body: JSON.stringify(newRecord),
                    headers: { 'Content-Type': 'application/json' },
                    retries: 100,
                    retryDelay: 3000
                })
                .then((response) => {
                    response.json().then(
                        (status) => {
                            //res.json(status);
                        }
                    )
                })  
            }
        )
    })
})

app.get('/api/record', (req, res) => {
    req.pipe(request(`${process.env.STORAGE_URL}/records?location=${req.query["location"]}&date=${req.query["date"]}`)).pipe(res);
})


app.get('/api/report', (req, res) => {
    fetch(`${process.env.STORAGE_URL}/report?location=${req.query["location"]}&date=${req.query["date"]}`,
    {compress: true,
    retries: 100,
    retryDelay: 3000}
    )
    .then((response) => {
        response.json().then(
            (data) => {
                res.json(data);
            }
        )
    })
})

app.get("/api/health", (req, res) => {
    res.json({status: "ok"});
})

app.get("/api/clean", (req, res) => {
    fetch(`${process.env.STORAGE_URL}/clean`,{compress: true, method: 'POST'})
    .then((response) => {
        response.json().then(
            (data) => {
                res.json(data);
            }
        )
    })
});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

process.on('SIGINT', function() {
    process.exit(0);
});
