import exp from 'express';
import {DBManager} from './SQLInjects.js';
import cors from 'cors';
const Manager = new DBManager()
const app = exp();
app.use(cors());

//getr - post - put ect, '/' is the path
app.get('/', (req,res) => {
    
    res.send(`Hello get World!  ${req.query.secret}`);
    console.log(req.query.secret);
})

app.get('/show/:id', async (req, res) => {
    let list = {};
    switch(req.params.id)
    {
        case 'Ingredients':
            list = await Manager.RetrieveIngredients();
            break;
        case 'Proteins':
            list = await Manager.RetrieveProteins();
            break;
        case 'Bases':
            list = await Manager.RetrieveBases();
            break;
        case 'Bowls':
            list = await Manager.RetrieveBowlDescriptor();
            break;
            case 'All':
                list.Bowls = await Manager.RetrieveBowlDescriptor();
                list.Ingredients = await Manager.RetrieveIngredients();
                list.Proteins = await Manager.RetrieveProteins();
                list.Bases = await Manager.RetrieveBases();
            break;
        default:
            res.status(400).send('Invalid id');
            return;
    }
    res.json(list);
});

app.use(exp.json());
//post json body
//server starter
app.listen(3000, async () => {
    const res =  await Manager.createTables();
    if(res == 0)
    {
        const rP = await Manager.Populate();
        if( rP == 0)
            console.log('Populated');
    }
    console.log('Server started on port 3000');
})
app.post('/NewTopping', (req, res) => {
    console.log(req.body);
    switch(req.body.TypeIngr)
    {
        case 'Ingredient':
            Manager.InsertNewIngredient(req.body.Name);
            break;
        case 'Protein':
            Manager.InsertNewProtein(req.body.Name);
            break;
        case 'Base':
            Manager.InsertIngredient(req.body.Name, req.body.TypeIngr);
            break;
        default:
            res.status(400).send('Invalid TypeIngr');
            return;
    }
    res.send('Received');    
});

app.post('/NewUser' , (req, res) => {
    console.log(req.body);
    if(!Manager.validateUserJson(req.body))
    {
        res.status(400).send('Invalid Json');
        return;
    }

    Manager.CreateNewUser(req.body.Name, req.body.Email, req.body.Password, "Customer");
    res.send('Received');
})


// This code is not valid JavaScript for a Node.js environment. Node.js does not understand JSX syntax.
// If you want to use this JSX, you need to use a React application and render it in the browser, not in your Express server.

// If you want to send HTML from your Express server, you can use a string like this:
app.get('/welcome', (req, res) => {
    res.send(`
        <div>
            <h1>Welcome to the server</h1>
            <p>Server is running on port 3000</p>
        </div>
    `);
});