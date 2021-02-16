const { app, BrowserWindow } = require('electron')
const ipcMain = require('electron').ipcMain;
const db = require('./js/database.js')

function createWindow () {
	const win = new BrowserWindow({
    	width: 800,
    	height: 600,
    	webPreferences: {
      	nodeIntegration: true
    	}
	})
	win.webContents.openDevTools()
	win.loadFile('html/index.html')

  	ipcMain.on('load-page', (event, osoite, args) => {
		//console.log(`${osoite}-data`);

		win.loadFile(`html/${osoite}.html`);
		if (typeof args !== "undefined"){
			win.webContents.on('did-finish-load', ()=>{
				win.webContents.send(`${osoite}-data`, args)
			})
		}
	});
}

ipcMain.on('fetch-data', (event, sql) =>{
	db.fetchData(event, sql)
})

ipcMain.on('insert-data', (event, sql) =>{
	db.insertData(event, sql)
})

app.whenReady().then(() => {
	createWindow()
})

app.on('window-all-closed', () => {
  	if (process.platform !== 'darwin') {
    	app.quit()
  	}
})

app.on('activate', () => {
  	if (BrowserWindow.getAllWindows().length === 0) {
    	createWindow()
  	}
})