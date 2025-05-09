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


} 