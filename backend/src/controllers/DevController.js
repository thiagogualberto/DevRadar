const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const  { findConnections, sendMessage } = require('../websocket');


//Funções que um controllers tem 5 funções:
//  index: quando quero mostrar uma LISTA deste recurso (DevController)
//  show: quando quero mostrar um ÚNICO recurso (DevController)
//  store: quando quero CRIAR um recurso (DevController)
//  update: quando quero EDITAR um recurso (DevController)
//  destroy: quando quero DELETAR um recurso (DevController)

module.exports = {
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store (request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
    
        let dev = await Dev.findOne({ github_username });

        if (!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs:techsArray,
                location,
            })

            // Filtrar as conexões que estão há no máx. 10km de distância
            // e que o novo dev tenha, pelo menos, uma das tecnologias filtradas.
        
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
    
        return response.json(dev);
    },

    /*
    async update(request, response){
        //Atualizar: nome, avatar, bio, localização e as techs
        const id = request.params;
        console.log(id);

        /*const { name, avatar_url, bio, techs, latitude, longitude } = request.body;

        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };*/
    /*
        dev = await Dev.findByIdAndUpdate(id, {
            $set: {
                name: request.body.name,
                avatar_url: request.body.avatar_url,
                bio: request.body.bio
            }
        });

        return response.json(dev);
    },

    async destroy(request, response){
        const id = request.params;

        dev = await Dev.findByIdAndDelete(id);

        return response.json({message: 'Dev removido com sucesso!'});
    }*/
}