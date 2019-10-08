const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

let genres = [{
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
    }
]

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(genre => {
        return genre.id === parseInt(req.params.id);
    });

    if (!genre) {
        return res.status(404).send('The genre with the given id could not be found');
    }

    res.send(genre);
});

app.post('/api/genres', (req, res) => {
    const { error } = validateInput(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre);
    res.send(genre);

});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(genre => {
        return genre.id === parseInt(req.params.id);
    });

    if (!genre) {
        return res.status(404).send('The genre with the given id could not be found');
    }

    const { error } = validateInput(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    genre.name = req.body.name;
    genres.push(genre);

    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(genre => {
        return genre.id === parseInt(req.params.id);
    });

    if (!genre) {
        return res.status(404).send('The genre with the given id could not be found');
    }

    const { error } = validateInput(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    };

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});


function validateInput(input) {
    schema = {
        name: Joi.string().min(2).required()
    };

    return Joi.validate(input, schema);
}