const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', async (req, res) => {
    const event = req.body;
    console.log("Recieved Event:", event);
    events.push(event);

    try {
        // await axios.post('http://localhost:4000/events', event);
        await axios.post('http://posts-clusterip-srv:4000/events', event);
        // await axios.post('http://localhost:4001/events', event);
        await axios.post('http://comments-srv:4001/events', event);
        // await axios.post('http://localhost:4002/events', event);
        await axios.post('http://query-srv:4002/events', event);
        // await axios.post('http://localhost:4003/events', event);
        await axios.post('http://moderation-srv:4003/events', event);
    } catch (error) {
        console.error('Error forwarding event:', error.message);
    }

    res.send({ status: 'OK' });
});


app.get('/events', (req, res) => {
    console.log("Recieved events");
    res.send(events);
});

app.listen(4005, () => {
    console.log('Listening on 4005');
});