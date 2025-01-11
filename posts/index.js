const express = require('express');
const bodyParser = require('body-parser');
//To generate a new ID for every post
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

//Creating a new app
const app = express();
app.use(bodyParser.json());
app.use(cors());

//To store every post created
const posts = {};

//Two different routes - to get post and to post
//Associating routes with app

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    };

    // await axios.post('http://localhost:4005/events', {
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }  
    });

    res.status(201).send(posts[id]);
});

//post request (event) handler
app.post('/events', (req, res) => {
    console.log('Recieved Event:', req.body.type);

    // Responding to the request that was issued
    res.send({});
});

//App listens to a specific port
//Starts a server that listens for incoming HTTP requests on port 4000
// 4000 port is the number where server will be running
app.listen(4000, () => {
    console.log('v1000');
    console.log('Listening on 4000');
});