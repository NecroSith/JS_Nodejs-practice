const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

const genres = [{
        id: 1,
        name: "action"
    },
    {
        id: 2,
        name: "comedy"
    },
    {
        id: 3,
        name: "horror"
    },
    {
        id: 4,
        name: "drama"
    },
    {
        id: 5,
        name: "detective"
    },
]

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

app.get('/api/genres', (req, res) => {
    res.send(req.body);
});

app.post();

app.put();

app.delete();

function validateInput(input) {

}