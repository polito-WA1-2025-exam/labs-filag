import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('db.sqlite', (err) => {
    if (err) throw err;
});

export function addProtein(name) {
    const checkQuery = 'SELECT COUNT(*) AS count FROM FOOD WHERE Name = ? AND Category = "Protein"';
    db.get(checkQuery, [name], (err, row) => {
        if (err) {
            console.error(err);
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                }
            });
            return;
        }

        if (row.count === 0) {
            const insertQuery = 'INSERT INTO FOOD (Name, Category) VALUES (?, "Protein")';
            db.run(insertQuery, [name], (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Protein ${name} added to the database.`);
                }
            });
        } else {
            console.log(`Protein ${name} already exists in the database.`);
        }
    });
}

export function addIngredient(name) {
    const checkQuery = 'SELECT COUNT(*) AS count FROM FOOD WHERE Name = ? AND Category = "Ingredient"';
    db.get(checkQuery, [name], (err, row) => {
        if (err) {
            console.error(err);
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                }
            });
            return;
        }

        if (row.count === 0) {
            const insertQuery = 'INSERT INTO FOOD (Name, Category) VALUES (?, "Ingredient")';
            db.run(insertQuery, [name], (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Ingredient ${name} added to the database.`);
                }
            });
        } else {
            console.log(`Ingredient ${name} already exists in the database.`);
        }
    });
}

export function addBase(name) {
    const checkQuery = 'SELECT COUNT(*) AS count FROM FOOD WHERE Name = ? AND Category = "Base"';
    db.get(checkQuery, [name], (err, row) => {
        if (err) {
            console.error(err);
            return;
        }

        if (row.count === 0) {
            const insertQuery = 'INSERT INTO FOOD (Name, Category) VALUES (?, "Base")';
            db.run(insertQuery, [name], (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Base ${name} added to the database.`);
                }
            });
        } else {
            console.log(`Base ${name} already exists in the database.`);
        }
    });
}

export function addInfoSize (size, Nproteins, MaxIngredients, InitialPrice, MaxQtyDaily) {
    const checkQuery = 'SELECT COUNT(*) AS count FROM INFO_SIZE WHERE Size = ?';
    db.get(checkQuery, [size], (err, row) => {
        if (err) {
            console.error(err);
            return;
        }

        if (row.count === 0) {
            const insertQuery = 'INSERT INTO INFO_SIZE (Size, NProteins, MaxIngredients, InitialPrice, MaxQtyDaily) VALUES (?, ?, ?, ?, ?)';
            db.run(insertQuery, [size, Nproteins, MaxIngredients, InitialPrice, MaxQtyDaily], (err) => {
                if (err) console.error(err);
                else console.log(`Info for size ${size} added to the database.`);
            });
        } else {
            console.log(`Info for size ${size} already exists in the database.`);
        }
    });


}

export function createDB () {
    let tableFood = `CREATE TABLE IF NOT EXISTS FOOD (FoodID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Category TEXT)`;
    let tableBowl = `CREATE TABLE IF NOT EXISTS BOWL (BowlID INTEGER PRIMARY KEY AUTOINCREMENT, Size TEXT, Quantity INTEGER, Price REAL)`;
    let tableInfoSize = `CREATE TABLE IF NOT EXISTS INFO_SIZE (Size TEXT PRIMARY KEY, NProteins INTEGER, MaxIngredients INTEGER, InitialPrice REAL, MaxQtyDaily INTEGER)`;
    let tableUsers = `CREATE TABLE IF NOT EXISTS USERS (UserID INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT, Password TEXT)`;
    let tableOrder = `CREATE TABLE IF NOT EXISTS ORDER_HISTORY (OrderID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER, BowlID INTEGER , Price REAL, SpecialRequest TEXT, FOREIGN KEY (BowlID) REFERENCES BOWL(BowlID), FOREIGN KEY (UserID) REFERENCES USERS(UserID))`;
    let tableBowlComposition = `CREATE TABLE IF NOT EXISTS BOWL_COMPOSITION (BowlID INTEGER, FoodID INTEGER, Quantity INTEGER, PRIMARY KEY (BowlID, FoodID), FOREIGN KEY (BowlID) REFERENCES BOWL(BowlID), FOREIGN KEY (FoodID) REFERENCES FOOD(FoodID))`;
    db.run (tableBowl, (err) => {if (err) throw err});
    db.run (tableFood, (err) => {if (err) throw err});
    db.run (tableInfoSize, (err) => {if (err) throw err});
    db.run (tableUsers, (err) => {if (err) throw err});
    db.run (tableOrder, (err) => {if (err) throw err});
    db.run (tableBowlComposition, (err) => {if (err) throw err});
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

export function populateEmptyDB () {
    addProtein ('chicken');
    addProtein ('salmon');
    addProtein ('tofu');
    addProtein ('tuna');
    addBase ('black rice');
    addBase ('salad');
    addBase ('rice');
    addIngredient ('avocado');
    addIngredient ('carrots');
    addIngredient ('cashew nuts');
    addIngredient ('corn');
    addIngredient ('kale');
    addIngredient ('mango');
    addIngredient ('peppers');
    addIngredient ('pineapple');
    addIngredient ('salad');
    addIngredient ('wakame');
    addIngredient ('tomatoes');
    addInfoSize ('R', 1, 4, 9, 10);
    addInfoSize ('M', 2, 4, 11, 8);
    addInfoSize ('L', 3, 6, 14, 6);
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

export const retreiveInfoSize = () => {
    return new Promise ((resolve, reject) => {
        const query = 'SELECT * FROM INFO_SIZE';
        db.all (query, [], (err, rows) => {
            if (err) reject (err);
            else resolve (rows);
        });
    });
}

//used to retreive all food belonging to category cat:
export const retreiveFoodByCat = (cat) => {
    return new Promise ((resolve, reject) => {
        const query = 'SELECT * FROM FOOD WHERE CATEGORY = ? ';
        db.all (query, [cat], (err, rows) => {
            if (err) reject (err);
            else resolve (rows);
        });
    });
}

export const retreiveFoodById = (id) => {
    return new Promise ((res, rej) => {
        const query = 'SELECT * FROM FOOD WHERE FoodID = ?';
        db.get (query, [id], (err, row) => {
            if (err) rej (err);
            else res (row);
        });
    })
}

/*
export const retreiveFoodById = (id) => {
    const query = 'SELECT * FROM FOOD WHERE FoodID = ?';
    db.get (query, [id], (err, row) => {
        if (err) {
            console.log (err);
            return null;
        }
        else return row;
    })
}
*/

export const createNewBowl = (size, qty) => {
    return new Promise ((resolve,reject) => {
        const insertQuery = 'INSERT INTO BOWL (Size, Quantity, Price) VALUES (?, ?, 0)';
        db.run(insertQuery, [size,qty], (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`Bowl added to the database.`);
                    //resolve ();
                }
            });
    });
}