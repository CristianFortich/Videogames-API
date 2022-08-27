const {Router} = require('express')
const {Op} = require('sequelize')
const {Videogame, Genre} = require('../db')

const router = Router();

router.get('/videogames', async (req,res)=>{
    const {name} = req.query;
    const condition = {};
    const where = {};
    if(name) where.name = {[Op.substring]: `%${name}%`};
    condition.where = where;
    condition.include = Genre;
    try {
        const games = await Videogame.findAll(condition);
        res.status(201).json(games);
    } catch (error) {
        res.status(401).send('something went wrong');
    }
})

router.get('/videogame/:id',async (req,res)=>{
    const {id} = req.params;
    try {
        const game = await Videogame.findByPk(id,{
            include: Genre
        });
        res.status(201).json(game);
    } catch (error) {
        res.status(404).send(`Videogame with id ${id} not found`);
    }
})

router.delete('/videogame/:id',async (req,res)=>{
    let {id} = req.params;
    id = id.split('-')[1]
    try {
        await Videogame.destroy({where: {fakeId: id}});
        res.status(201).send(`The game with id ${id} was successfuly deleted`);
    } catch (error) {
        res.status(404).send(`Videogame with id ${id} not found`);
    }
})

router.post('/videogame',async (req,res)=>{
    const {name, description, released, rating, platforms, genres} = req.body;
    try {
        const newGame = await Videogame.create({
            name: name,
            description: description,
            released: released,
            rating: rating,
            platforms: platforms
        })
        await newGame.addGenres(genres);
        const total = await Videogame.findOne({
            where: {
                fakeId: newGame.fakeId
            },
            include: Genre
        });
        res.status(201).json(total);
    } catch (error) {
        res.status(401).send('Something where wrong while creating a new game');
    }

})

module.exports = router;
