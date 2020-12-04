const ipcRenderer = require('electron').ipcRenderer;

let moove = (osoite , args) => ipcRenderer.send("load-page", osoite, args);