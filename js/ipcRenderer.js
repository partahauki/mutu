const ipcRenderer = require('electron').ipcRenderer

function renderPage(osoite, args) {
    return ipcRenderer.send("load-page", osoite, args);
}