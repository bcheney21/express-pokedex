const router = require('express').Router()
const { default: axios } = require('axios')
const db = require('../models')


router.get('/', async (req, res) => {
    try {
        const pokemons = await db.pokemon.findAll({ raw: true })
        // console.log(pokemons)

        res.render('pokemon/index', { pokemons: pokemons })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const [newPokemon, created] = await db.pokemon.findOrCreate({
            where: { name: req.body.name }
        })
        // console.log(newPokemon)
        // console.log(created)

        res.redirect('/pokemons')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/:name', async (req, res) => {
    try {
        const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/' + req.params.name 
        const response = await axios.get(pokeApiUrl)
        const pokemon = response.data
        console.log(pokemon)
    } catch (error) {
        console.log(error)
    }
//     const pokeName = req.params.name
//     const pokeURL = await axios.get('http://pokeapi.co/api/v2/pokemon/' + pokeName)
//     const pokeData = pokeURL.data
//     const pokeMoves = pokeData.moves
//     res.render('pokemon/show', { pokeData: pokeData}, { pokeMoves: pokeMoves})
//     // res.send(pokeData)
//     // res.send(pokeMoves)
// })

module.exports = router;