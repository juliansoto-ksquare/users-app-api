const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cuid = require('cuid');

let users = [
    {
        firstName: 'John',
        lastName: 'Doe',
        age: 42,
        id: "1"
    }
];

app.use(bodyparser.json());

app.get('/users/:id', (req, res, next) => {
    const { id } = req.params;
    const index = users.map(user => user.id).indexOf(id);

    if (index === -1) {
        return res.status(404).json({});
    }

    return res.json({ user: users[index] });
})

app.put('/users/:id', (req, res, next) => {
    const {id} = req.params;
    const index = users.map(user => user.id).indexOf(id);
    if (index === -1) return res.status(404).json({});
    const user = users[index];
    const {firstName, lastName} = req.body;
    Object.assign(user, { firstName, lastName });
    return res.json({ user });
})

app.delete('/users/:id', (req, res, next) => {
    const {id } = req.params;
    const index = users.map(user => user.id).indexOf(id);

    if (index === -1) {
        return res.status(404).json({});
    }

    users.splice(index, 1);

    return res.status(204).json({});
})

app.get('/users', (req, res, next) => {
    res.json({ users });
});

app.post('/users', (req, res, next) => {
    const {body} = req;
    if (!body.firstName) return res.status(400).json({});
    if (!body.lastName) return res.status(400).json({});
    if (typeof body.age !== 'number') return res.status(400).json({});
    if (body.age < 0) return res.status(400).json({});
    return next();
}, (req, res, next) => {
    const {firstName, lastName, age} = req.body;

    const user = {
        firstName,
        lastName,
        age,
        id: cuid()
    };

    users.push(user);
    res.status(201).json({ user });
})

module.exports = app;