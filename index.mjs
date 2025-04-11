import express from 'express'
import './poke.mjs'
import { retreiveFoodByCat } from './dao.mjs';
import { retreiveFoodById } from './dao.mjs';

const app = express();

//any route, before processing the route, checks if 
//some json body needs to be processed
app.use (express.json())

//define routes:
app.get ('/', (req, res) => res.send ('Hello world'))

/*PROVA:
app.get ('/user', (req, res) => {
    let u = {name: 'Ricc', id: 123}
    res.json(u)
})

app.post ('/user', (req,res) => {
    console.log(req.body)
    res.end()
})

app.get ('/user/:id/name', (req,res) => {
    const id = req.params.id
    res.json ( {"id": id, "name": "Tom"})
})
*/

//retreives all food beloning to category "cat":
app.get ('/show/:cat', async (req, res) => {
    console.log(req.params.cat);
    let list = null;
    switch(req.params.cat) {
        case 'ingredients':
            list = await retreiveFoodByCat('Ingredient');
            break;
        case 'proteins':
            list = await retreiveFoodByCat('Protein');
            break;
        case 'bases':
            list = await retreiveFoodByCat('Base');
            break;
        default:
            res.status(400).send('Invalid id');
            return;
    }
    res.json(list);
});

//retreives food by id:
app.get ('/show/food/:id', async (req, res) => {
    console.log(req.params.id);
    let food = null;
    food = await retreiveFoodById (req.params.id);
    res.json (food);
})

//activate server:
app.listen (3000, () => console.log('Server ready'))