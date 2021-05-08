const sqlite3 = require('sqlite3').verbose();

const db_path = "./db/database.db"
 
exports.fetchData = (sql) => {
    const db = connectDatabase()

    db.all(sql, [], (err, rows) => {
        if(err){
            console.error(err.message)
        }
        else{
            handle_sql_results(rows)
        }
        db.close()
    })
}

exports.insertData = (sql) => {
    const db = connectDatabase()
    //ei arrow-syntaxia jos halutaan käyttää this-kontekstia

    db.run(sql, [], function(err) {
        if(err){
            console.error(err.message)
        }
        else {
            handle_sql_results(this.lastID)
        }
        db.close()
    })
}

connectDatabase = () => {
    const db = new sqlite3.Database(db_path, (err) => {
        if (err) console.error(err.message)
        else console.log('Database exists.')
    });
    return db
}