const sqlite3 = require('sqlite3').verbose();

const db_path = "./db/database.db"
 
exports.fetchData = (event, sql) => {
    const db = connectDatabase()
    db.all(sql, [], (err, rows) => {
        if(err){
            console.error(err.message)
            event.reply("database-error")
        }
        else{
            event.reply("data-for-renderer", rows)
        }
        db.close()
    })
}

exports.insertData = (event, sql) => {
    const db = connectDatabase()
    //ei arrow-syntaxia jos halutaan käyttää this-kontekstia
    db.run(sql, [], function(err) {
        if(err){
            console.error(err.message)
            event.reply("database-error")
        }
        else{
            event.reply("data-for-renderer", this.lastID)
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