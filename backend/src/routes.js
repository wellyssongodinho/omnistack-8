const express = require('express');
const devController = require('./controllers/devController');
const likeController = require('./controllers/likeController');
const dislikeController = require('./controllers/dislikeController');
const routes = express.Router();

routes.get('/devs', devController.index);
routes.post('/devs', devController.store);
routes.post('/devs/:devId/likes', likeController.store);
routes.post('/devs/:devId/dislikes', dislikeController.store);

//routes.get('/',function(req, res){
//    return res.send('Hello World');
//    return res.send(`Hello ${req.query.name}`);
//    return res.json({message: `Olá ${req.query.name}`});
//});

//routes.post('/devs', function(req, res){
//    console.log(req.body);
//    return res.json({ok: true});
//    return res.json(req.body);
//})
    
module.exports = routes;