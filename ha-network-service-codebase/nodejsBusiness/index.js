const express = require('express')
const app = express()
const port = 8100

const bodyParser = require('body-parser');
app.use(bodyParser.json()); 

const fetch = require('node-fetch');

app.post('/api/order', (req, res) => {

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