const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://thiago:TfxJJatneTP8jUde@cluster0-p5lda.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json()); //Tem que vim antes das rotas
app.use(routes);

//Métodos HTTP: GET, POST, PUT, DELETE

//Tipos de parâmetros:
    //Query Params: Utilizado no método GET. Quando quero filtrar uma pesquisa por parâmetros. request.query(Filtros, ordenação, paginação, ...)
    //Route Params: Utilizado no método PUT e DELETE. request.params (Identificar um recurso na alteração ou remoção)
    //Body: POST e PUT. request.body (Dados para a criação ou alteração de um registro) 

//MongoDB (Não-relacional) - Extremamento perfomático


server.listen(3333);