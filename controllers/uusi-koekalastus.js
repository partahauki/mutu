const Database = require('better-sqlite3');
const db2 = new Database('./db/database.db', { verbose: console.log });

exports.controller = (event, command, args) => {
    switch(command) {
        case "createKoekalastus":
          createKoekalastus(event, args)
          break;
      } 
}

createKoekalastus = (event, name) => {
    let insert = db2.prepare(`INSERT INTO koekalastukset VALUES(null, '${name}')`)
    let lastKey = insert.run().lastInsertRowid

    let ipc_send = {'avain' : lastKey}
    event.reply('proceedPage', ipc_send)
}