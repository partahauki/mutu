const Database = require('better-sqlite3');
const db2 = new Database('./db/database.db', { verbose: console.log });

exports.controller = (event, command, args) => {
    switch(command) {
        case "createAla":
            createAla(event, args)
            break;
    } 
}

createAla = (event, args) => {
    let insert = db2.prepare(`INSERT INTO koealat VALUES(null,
        '${args["koealaName"]}','${args["avain"]}' , false, false)`)
    let koealaId = insert.run().lastInsertRowid

    let select = db2.prepare(`SELECT * FROM link_koelalat_kaominaisuudet 
        WHERE id_koealat = ${args["templateId"]}`)
    let templateLinks = select.all()

    insert = "INSERT INTO link_koelalat_kaominaisuudet VALUES "
    templateLinks.forEach(row => {
        insert += (`(${koealaId},${row["id_kaominaisuudet"]},
            ${row["tiedot"]}),`)
    })
    insert = insert.slice(0, -1)
    insert = db2.prepare(insert).run()
    
    event.reply("proceedPage", koealaId)
}