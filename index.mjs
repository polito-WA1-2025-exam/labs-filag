import express from 'express'
import morgan from 'morgan';
import fs from 'fs';
import sqlite3 from 'sqlite3';
import { get } from 'http';
import UserDao from './user_Dao.mjs';


const app = express() ;
const userDao = new UserDao();

app.use(express.json())
app.use(morgan('dev'))


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



app.listen(3000, () =>	console.log('Server	ready')) ;