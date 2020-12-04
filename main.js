const { app, BrowserWindow } = require('electron')
const ipcMain = require('electron').ipcMain;

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

app.whenReady().then(createWindow)

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


