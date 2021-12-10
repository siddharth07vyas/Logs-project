var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE Logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            startdate text, 
            description text, 
            enddate text
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log('Table created');
            }
        });  
    }
});


module.exports = db