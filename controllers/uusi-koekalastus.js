exports.controller = (event, command, args) => {
    switch(command) {
        case "createKoekalastus":
          createKoekalastus(args)
          break;
        case y:
          // code block
          break;
      } 
}

createKoekalastus = (name) => {
    insert_sql = `INSERT INTO koekalastukset VALUES(null, '${name}')`
    ipcRenderer.send("insert-data", insert_sql)
}

ipcRenderer.on("data-for-renderer", (event, avain) => {
    let ipc_send = {'avain' : avain}
    render_page("koekalastus", ipc_send)
})