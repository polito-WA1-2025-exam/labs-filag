import express from 'express'
import morgan from 'morgan';
import cors from 'cors';
import fs from 'fs';
import sqlite3 from 'sqlite3';
import { get } from 'http';
import UserDao from './user_Dao.mjs';
import BowlDao from './bowl_Dao.mjs';


const app = express() ;
const userDao = new UserDao();
const bowlDao = new BowlDao();

app.use(express.json())
app.use(morgan('dev'))
app.use(cors());


app.get('/', (req, res) =>	res.send('Hello World!')) ;

app.get('/user/:n', async (req, res) => {
    const n = req.params.n;
    let list = await userDao.getUser(n);
    if (list == null) {
        res.status(404).send('User not found');
        return;
    }
    res.json(list)
})

app.get('/user/id/:n', async (req, res) => {
    const n = req.params.n;
    let list = await userDao.getUserId(n);
    if (list == null) {
        res.status(404).send('User not found');
        return;
    }
    res.json(list)
})

app.get('/api/options', async (req, res) => {
    const options = await bowlDao.getOptionsBase();
    res.json(options);
});

app.get('/api/ingredients', async (req, res) => {
    const ingredients = await bowlDao.getIngredients(); 
    res.json(ingredients);
});

app.get('/api/proteins', async (req, res) => {
    const proteins = await bowlDao.getProteins(); 
    res.json(proteins);
});



app.listen(3000, () =>	console.log('Server	ready')) ;