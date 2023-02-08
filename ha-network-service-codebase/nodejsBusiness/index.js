const express = require('express')
const app = express()
const port = 8100

const bodyParser = require('body-parser');
app.use(bodyParser.json()); 

const fetch = require('node-fetch');

app.post('/api/order', (req, res) => {
    fetch(`${process.env.INVENTORY_URL}/material`,{
        method: 'POST',
        body: JSON.stringify(req.body),
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
                    material: req.body["data"]["material"],
                    a: req.body["data"]["a"],
                    b: req.body["data"]["b"],
                    c: req.body["data"]["c"],
                    d: req.body["data"]["d"]
                }
                fetch(`${process.env.STORAGE_URL}/records`,{
                    method: 'POST',
                    body: JSON.stringify(newRecord),
                    headers: { 'Content-Type': 'application/json' }
                })
                .then((response) => {
                    response.json().then(
                        (status) => {
                            res.json(status);
                        }
                    )
                })  
            }
        )
    })
})

app.get('/api/record', (req, res) => {
    fetch(`${process.env.STORAGE_URL}/records?location=${req.query["location"]}&date=${req.query["date"]}`)
    .then((response) => {
        response.json().then(
            (data) => {
                res.json(data);
            }
        )
    })
})

app.post('/api/report', (req, res) => {
    fetch(`${process.env.STORAGE_URL}/report?location=${req.query["location"]}&date=${req.query["date"]}`)
    .then((response) => {
        response.json().then(
            (data) => {
                res.json(data);
            }
        )
    })
})

app.get("api/health", (req, res) => {
    res.json({status: "ok"});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})