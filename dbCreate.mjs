import db from './db.mjs';

const queries = [
    "CREATE TABLE IF NOT EXISTS USER (UserId INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, surname TEXT, email TEXT, birthdate TEXT)",
    "CREATE TABLE IF NOT EXISTS INGREDIENTS (IngredientId INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, TypeIngr TEXT)",
    "CREATE TABLE IF NOT EXISTS BOWL (BowlId INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL)",
    "CREATE TABLE IF NOT EXISTS BOWL_COMPOSITION (BowlId INTEGER, IngredientsId INTEGER, Quantity INTEGER, FOREIGN KEY (BowlId) REFERENCES BOWL(BowlId), FOREIGN KEY (IngredientsId) REFERENCES INGREDIENTS(IngredientsId), PRIMARY KEY (BowlId, IngredientsId))",
    "CREATE TABLE IF NOT EXISTS ORDERS_COMPOSITION (UserId INTEGER, BowlId INTEGER, Date TEXT, OrderId INTEGER, FOREIGN KEY (UserId) REFERENCES USER(UserId), FOREIGN KEY (BowlId) REFERENCES BOWL(BowlId), FOREIGN KEY (OrderId) REFERENCES ORDERS(OrderId), PRIMARY KEY (UserId, BowlId))",
    "CREATE TABLE IF NOT EXISTS ORDERS (OrderId INTEGER PRIMARY KEY AUTOINCREMENT, UserId INTEGER, FOREIGN KEY (UserId) REFERENCES USER(UserId))"
];

queries.forEach(query => db.run(query)); 

const ingredients = [
    "INSERT INTO INGREDIENTS (name, TypeIngr) VALUES ('Rice', 'Base')",
    "INSERT INTO INGREDIENTS (name, TypeIngr) VALUES ('Beans', 'Base')",    
    "INSERT INTO INGREDIENTS (name, TypeIngr) VALUES ('Chicken', 'Protein')",
    "INSERT INTO INGREDIENTS (name, TypeIngr) VALUES ('Beef', 'Protein')",
    "INSERT INTO INGREDIENTS (name, TypeIngr) VALUES ('Pork', 'Protein')",
    "INSERT INTO INGREDIENTS (name, TypeIngr) VALUES ('Salmon', 'Protein')",
    "INSERT INTO INGREDIENTS (name, TypeIngr) VALUES ('Tuna', 'Protein')",
    "INSERT INTO INGREDIENTS (name, TypeIngr) VALUES ('Shrimp', 'Protein')",
    "INSERT INTO INGREDIENTS (name, TypeIngr) VALUES ('Avocado', 'Protein')",
    "INSERT INTO INGREDIENTS (name, TypeIngr) VALUES ('Tomato', 'Ingredient')",
    "INSERT INTO INGREDIENTS (name, TypeIngr) VALUES ('Cucumber', 'Ingredient')",
    "INSERT INTO INGREDIENTS (name, TypeIngr) VALUES ('Carrot', 'Ingredient')",
    "INSERT INTO INGREDIENTS (name, TypeIngr) VALUES ('Onion', 'Ingredient')",
    "INSERT INTO INGREDIENTS (name, TypeIngr) VALUES ('Broccoli', 'Ingredient')",
    "INSERT INTO INGREDIENTS (name, TypeIngr) VALUES ('Spinach', 'Ingredient')",
];

const users = [
    "INSERT INTO USER (name, surname, email, birthdate) VALUES ('Elisa', 'Bariselli', 'eli.bari@gmail.com', '2002-05-12')",
    "INSERT INTO USER (name, surname, email, birthdate) VALUES ('Giulia', 'Bianchi', 'gb@libero.it', '2000-02-23')",
    "INSERT INTO USER (name, surname, email, birthdate) VALUES ('Mario', 'Rossi', 'mr@gmail.it', '1998-07-15')",
    "INSERT INTO USER (name, surname, email, birthdate) VALUES ('Luca', 'Verdi', 'lv@hotmail.it', '1995-12-30')",];

function runQueries(queries) {
    return new Promise((resolve, reject) => {
        let index = 0;
        function next() {
            if (index < queries.length) {
                db.run(queries[index], (err) => {
                    if (err) return reject(err);
                    index++;
                    next();
                });
            } else {
                resolve();
            }
        }
        next();
    });
}

export function AddOrder(id) {
    return new Promise((resolve, reject) => { 
        const query = "INSERT INTO ORDERS (UserId) VALUES (?)";
        db.run(query, [id], function(err) {
            if (err) reject(err);
            resolve();
        });

    })
}

export function AddBowl(name, price) {
    return new Promise((resolve, reject) => { 
        const query = "INSERT INTO BOWL (name, price) VALUES ('MyBowl', 10)";
        db.run(query, function(err) {
            if (err) reject(err);
            resolve();
        });

    })
}

runQueries(queries)
    .then(() => runQueries(ingredients))
    .then(() => runQueries(users))
    .then(() => {
        console.log('Tables created and data inserted successfully');
    
    })
    .catch((err) => {
        console.error(err);
        db.close();
});




