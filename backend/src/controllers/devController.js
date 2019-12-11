const axios = require('axios');
const dev = require('../models/dev')

module.exports = {

    async index(req, res){
        const { user } = req.headers;

        const loggedDev = await dev.findById( user );

        const users = await dev.find({
            $and: [
                { _id: {$ne: user } }, //not exists
                { _id: {$nin: loggedDev.likes} }, //not in likes
                { _id: {$nin: loggedDev.dislikes} } //not in dislikes
            ]
        });
        return res.json(users);
    },

    async store(req, res){
        const { username } = req.body;

        const userExists = await dev.findOne({ user: username });
        if (userExists){
            return res.json(userExists);
        }

        //await = wait response
        const axiosResponse = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = axiosResponse.data;
        
        const devCreate = await dev.create({
            name,
            user: username,
            bio,
            avatar
        })

        return res.json (devCreate);
    }
};