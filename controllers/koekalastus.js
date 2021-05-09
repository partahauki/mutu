const Database = require('better-sqlite3');
const db2 = new Database('./db/database.db', { verbose: console.log });

exports.controller = (event, command, args) => {
    switch(command) {
        case "initialize":
            initialize(event, args)
            break;
    } 
}

initialize = (event, args) => {
    let select = db2.prepare(`SELECT nimi FROM koekalastukset 
        WHERE id=${args["avain"]}`)
    let row = select.get()
    event.reply('data-for-renderer', row)
}