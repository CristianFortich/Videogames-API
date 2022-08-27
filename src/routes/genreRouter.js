const axios = require('axios')
const { Router } = require('express');
const { Genre } = require('../db');
const { YOUR_API_KEY } = process.env;

const router = Router();

router.get('/genres', async (req,res)=>{
    try {
        const genres = await Genre.findAll();
        if(genres.length > 0){
            res.status(200).json(genres);
        }else{
            let response = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
            response = response.data.results;
            let genreNames = response.map(g=>g.name)
            for (let index = 0; index < genreNames.length; index++) {
                await Genre.create({
                    name: genreNames[index]
                })
            }
            const genresOnDb = await Genre.findAll();
            res.status(200).json(genresOnDb);
        }
    } catch (error) {
        res.status(404).send('Genres not found');
    }
})

module.exports = router