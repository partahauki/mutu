const Database = require('better-sqlite3');
const db2 = new Database('./db/database.db', { verbose: console.log });

exports.controller = (event, command, args) => {
    switch(command) {
        case "createAla":
            createAla(event, args)
            break;
        case "initializeSelections":
            initializeSelections(event)
            break;
        case "initializeTemplatePreview":
            initializeTemplatePreview(event, args)
            break;
    } 
}

initializeSelections = (event) => {
        console.log("ini käynnistyi!")
    let select = db2.prepare(`SELECT * FROM koealat WHERE on_templaatti = true`)
    event.reply("setSelections", select.all())
}

//ARGS!?!?!?!?
initializeTemplatePreview = (event, args) => {
    console.log("InitempPreview Lähri käyntiin!")
    console.log(args)
    let select = db2.prepare(`SELECT * FROM koealat WHERE id = ${args}`)
    let template = select.all()
    console.log(template)
    select = db2.prepare(`SELECT * FROM link_koealat_kaominaisuudet WHERE id_koealat = ${template[0]['id']}`)
    let templateLinks = select.all()
    event.reply("setTemplatePreview", templateLinks)

}
//ARGS?!?!?!
createAla = (event, args) => {
    console.log("MIKSI")
    let insert = db2.prepare(`INSERT INTO koealat VALUES(null,'${args["koealaName"]}','${args["avain"]}' , false, false)`)
    let koealaId = insert.run().lastInsertRowid

    let select = db2.prepare(`SELECT * FROM link_koealat_kaominaisuudet WHERE id_koealat = ${args["templateId"]}`)
    let templateLinks = select.all()

    insert = "INSERT INTO link_koealat_kaominaisuudet VALUES "
    templateLinks.forEach(row => {
        insert += (`(${koealaId},${row["id_kaominaisuudet"]},${row["tiedot"]}),`)
    })
    insert = insert.slice(0, -1)
    insert = db2.prepare(insert).run()
    
    event.reply("proceedPage", koealaId)
}