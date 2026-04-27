const { Router } = require('express');

const userRoutes = Router();

userRoutes.post('/signup', (req, res) => {
    res.json('Hello World!');
});

userRoutes.post('/signin', (req, res) => {
    res.json('Hello World!');
});

userRoutes.get('/purchases', (req, res) => {
    res.json('Hello World!');
});

module.exports = {
    userRoutes: userRoutes
}