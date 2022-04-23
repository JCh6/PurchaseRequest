const express = require('express');
const crypto = require ("crypto");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`FACT listening on port ${port}`);
});

app.get('/', (req, res) => {
    console.log(`[INFO] ${new Date().toISOString()}: GET /`);
    res.type('application/json')
    res.send('{"STATUS": "UP"}');
});

app.get('/api/v1/invoice', (req, res) => {
    let paymentMethod = req.query.method;
    let vendorName = req.query.vendor;

    console.log(`[INFO] ${new Date().toISOString()}: GET /invoice`);
    res.type('application/xml');
    res.send(mockResponse(paymentMethod, vendorName));
});

let mockResponse = (paymentMethod, vendorName) => {
    let id = crypto.randomUUID();
    let currentdt = new Date();
    let paymentdt = new Date(currentdt).setDate(currentdt.getDate() + getRandomInt(20, 180));

    return `
    <?xml version="1.0" encoding="UTF-8" ?>
        <invoice>
            <id>${id}</id>
            <issueDate>${currentdt.toISOString()}</issueDate>
            <paymentDate>${new Date(paymentdt).toISOString()}</paymentDate>
            <paymentMethod>${paymentMethod}</paymentMethod>
            <vendor>${vendorName}</vendor>
        </invoice>
    `.trim();
}

let getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
