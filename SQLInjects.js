let t0 = "CREATE TABLE IF NOT EXISTS BowlDescriptor (IDBowlDescriptor INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, NumOfIngredients INTEGER, NumOfProtein Integer, Price REAL, NumDaily INTEGER)";
let tUser = "Create table if not exists User (IDUser INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Email TEXT, Password TEXT, Role TEXT,unique(Email))";
let t1 = "CREATE TABLE IF NOT EXISTS TOPPINGS (IdTopping INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, TypeIngr TEXT, unique(name, TypeIngr))";
let t2 = "CREATE TABLE IF NOT EXISTS UserOrder (IdOrder INTEGER PRIMARY KEY AUTOINCREMENT, FkUser INTEGER, Date TEXT, UserNote TEXT, FOREIGN KEY (FkUser) REFERENCES User(IDUser))";
let t3 = "CREATE TABLE IF NOT EXISTS BOWL (IdBowl INTEGER PRIMARY KEY AUTOINCREMENT, NumberOfBowl Integer, FK_IdOrder INTEGER, FOREIGN KEY (FK_IdOrder) REFERENCES UserOrder(IdOrder))";
let t4 = "CREATE TABLE IF NOT EXISTS BOWL_COMPOSITION (IdBowlComposition INTEGER PRIMARY KEY AUTOINCREMENT, FK_IdBowl INTEGER, FK_IdToppings INTEGER, Quantity INTEGER, FOREIGN KEY (FK_IdBowl) REFERENCES BOWL(IdBowl), FOREIGN KEY (FK_IdToppings) REFERENCES TOPPINGS(IdTopping))";
import fs from 'fs';
import sqlite from 'sqlite3';
export class DBManager
{
    
    constructor()
    {
        this.db = new sqlite.Database('db.sqlite', (err) => { if (err) throw err; });
    }
    async createTables()
    {
        this.db.run(t0, (err) => { if (err) throw err; });
        this.db.run(tUser, (err) => { if (err) throw err; });
        this.db.run(t1, (err) => { if (err) throw err; });
        this.db.run(t2, (err) => { if (err) throw err; });
        this.db.run(t3, (err) => { if (err) throw err; });
        this.db.run(t4, (err) => { if (err) throw err

        });
    }
    async Populate()
    {
        
        const toppings = JSON.parse(fs.readFileSync('.\\JsonPopulation\\ToppingsPopulation.json', 'utf8'));
        toppings.forEach((topping) => {
            this.db.get("SELECT count(*) as N FROM TOPPINGS WHERE name = ? AND TypeIngr = ?", [topping.Name, topping.TypeIngr], (err, row) => {
                if (err) throw err;
                if (row.N === 0) {
                    this.db.run("INSERT INTO TOPPINGS (name, TypeIngr) VALUES (?, ?)", [topping.Name, topping.TypeIngr], (err) => {
                        if (err) throw err;
                    });
                }
            });
        });    
        const bowlDescriptor = JSON.parse(fs.readFileSync('.\\JsonPopulation\\BowlDescriptor.json', 'utf8'));
        //inswert the bowl descriptor
        bowlDescriptor.forEach((bowl) => {
            this.db.get("SELECT count(*) as N FROM BowlDescriptor WHERE Name = ?", [bowl.Name], (err, row) => {
                if (err) throw err;
                if (row.N === 0) {
                    this.db.run("INSERT INTO BowlDescriptor (Name, NumOfIngredients, NumOfProtein, Price, NumDaily) VALUES (?, ?, ?, ?, ?)", [bowl.Name, bowl.NumOfIngredients, bowl.NumOfProtein, bowl.Price, bowl.NumDaily], (err) => {
                        if (err) throw err;
                    });
                }
            });
        });
    }

    RetrieveIngredients()
    {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM TOPPINGS WHERE TypeIngr ='Ingredient'", (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
    RetrieveProteins()
    {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM TOPPINGS WHERE TypeIngr ='Protein'", (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
    RetrieveBases()
    {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM TOPPINGS WHERE TypeIngr ='Base'", (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
    InsertNewTopping(name,type)
    {
        return new Promise((resolve, reject) => {
            this.db.run("INSERT INTO TOPPINGS (name, TypeIngr) VALUES (?, ?);", [name, type], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
    InsertNewProtein(name)
    {
        this.InsertNewTopping(name, 'Protein');
    }
    InsertNewBase(name)
    {
       this.InsertNewTopping(name, 'Base');
    }
    CreateNewUser(name, email, password, role)
    {
        return new Promise((resolve, reject) => {
            this.db.run("INSERT INTO User (Name, Email, Password, Role) VALUES (?, ?, ?, ?);", [name, email, password, role], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
    Login(mail, password)
    {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM User WHERE Email = ? AND Password = ?;", [mail, password], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
    CreateNewOrder(fkUser, date, userNote)
    {
        return new Promise((resolve, reject) => {
            this.db.run("INSERT INTO UserOrder (FkUser, Date, UserNote) VALUES (?, ?, ?);", [fkUser, date, userNote], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
    CreateNewBowl(fkIdOrder, numberOfBowl)
    {
        return new Promise((resolve, reject) => {
            this.db.run("INSERT INTO BOWL (NumberOfBowl, FK_IdOrder) VALUES (?, ?);", [numberOfBowl, fkIdOrder], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
    CreateNewBowlComposition(fkIdBowl, fkIdToppings, quantity)
    {
        return new Promise((resolve, reject) => {
            this.db.run("INSERT INTO BOWL_COMPOSITION (FK_IdBowl, FK_IdToppings, Quantity) VALUES (?, ?, ?);", [fkIdBowl, fkIdToppings, quantity], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
    RetrieveBowlDescriptor()
    {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM BowlDescriptor", (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
    

    validateToppingJson(json)
    {
        if (json.Name === undefined || json.TypeIngr === undefined)
            return false;
        return true;
    }
    validateUserJson(json)
    {
        if (json.Name === undefined || json.Email === undefined || json.Password === undefined )
            return false;
        return true;
    }
}
