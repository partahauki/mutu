const ipcRenderer = require('electron').ipcRenderer

function render_page(osoite, args) {
    return ipcRenderer.send("load-page", osoite, args);
}