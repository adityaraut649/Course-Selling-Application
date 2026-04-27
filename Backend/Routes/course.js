const { Router } = require('express');
const courseRoutes = Router();

courseRoutes.post('/purchase', (req, res) => {
    res.json({
        message: 'Course Purchased Successfully'
    });
});


courseRoutes.get('/preview', (req, res) => {
    res.json({
        message: 'singup endpoint'
    });
});


module.exports = {
    courseRoutes: courseRoutes
}