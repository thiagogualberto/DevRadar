const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.get('/search', SearchController.index);
//routes.delete('/devs/:_id', DevController.destroy);
//routes.put('/devs/:_id', DevController.update);

module.exports = routes;