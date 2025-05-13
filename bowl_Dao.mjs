import db from "./db.mjs";

export default function BowlDao() {
    
    this.getOptionsBase = async function() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM INGREDIENTS WHERE TypeIngr='Base' ",  (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    };
    
    this.getIngredients = async function() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM INGREDIENTS WHERE TypeIngr='Ingredient'",  (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    };

    this.getProteins = async function() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM INGREDIENTS WHERE TypeIngr='Protein'",  (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    };

    this.addIngredients = async function (bowlId, base, ingredients, proteins) {
        const all = [base, ...ingredients, ...proteins];
        new Promise((resolve, reject) =>{
            for (const i of all) {

                db.run("INSERT INTO BOWL_COMPOSITION (BowlId, IngredientsId) VALUES (?, ?)", [bowlId, i], function(err) {
                    if (err) {
                        console.error(err.message);
                        reject(err);

                    } else {
                        resolve();
                    }
                });
            }
        })
    }


    this.addBowl = async function (option, price){
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO BOWL (name, price) VALUES (?, ?)", [option, price], function(err) {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
            
        });

    }


} 