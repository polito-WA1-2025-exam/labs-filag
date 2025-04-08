import db from "./db.mjs";

export default function UserDao() {
    
    this.getUser = async function(n) {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM USER WHERE name= ?", [n], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    };

    this.getUserId = async function(n) {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM USER WHERE UserId= ?", [n], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    };

    



} 





