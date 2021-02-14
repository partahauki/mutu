const { app, BrowserWindow } = require('electron')
const ipcMain = require('electron').ipcMain;
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

function createWindow () {
	const win = new BrowserWindow({
    	width: 800,
    	height: 600,
    	webPreferences: {
      	nodeIntegration: true
    	}
	})

	win.loadFile('html/index.html')

  	ipcMain.on('load-page', (event, osoite, args) => {
		console.log(args);
		console.log(`${osoite}-data`);

		win.loadFile(`html/${osoite}.html`);
		if (args != null){
			win.webContents.on('did-finish-load', ()=>{
				win.webContents.send(`${osoite}-data`, args)
			})
		}
	});
}

const path = '/db/database.db';

try {
  if (fs.existsSync(path)) {
    let db = new sqlite3.Database('./db/database.db', sqlite3.OPEN_READWRITE, (err) => {
		if (err) {
		  console.error(err.message);
		}
		console.log('Connected to the database.');
	});
  }
} catch(err) {
  console.error(err);
}


/*let db = new sqlite3.Database('./db/database.db', sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
	  console.error(err.message);
	}
	console.log('Connected to the database.');
});*/

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  	if (process.platform !== 'darwin') {
		db.close();
    	app.quit()
  	}
})

app.on('activate', () => {
  	if (BrowserWindow.getAllWindows().length === 0) {
    	createWindow()
  	}
})