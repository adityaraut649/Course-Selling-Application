const {Router} = require('express');
const adminRoutes = Router();


adminRoutes.post('/signup', (req, res) => {
    res.json({
        message: 'singup endpoint'
    });
});


adminRoutes.post('/signin', (req, res) => {
    res.json({
        message: 'singup endpoint'
    });
});


adminRoutes.post('/course', (req, res) => {
    res.json({
        message: 'singup endpoint'
    });
});


adminRoutes.put('/course', (req, res) => {
    res.json({
        message: 'singup endpoint'
    });
});

adminRoutes.get('/course/bulk', (req, res) => {
    res.json({
        message: 'singup endpoint'
    });
});


module.exports = {
    adminRoutes : adminRoutes
}