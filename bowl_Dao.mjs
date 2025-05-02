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
    

} 