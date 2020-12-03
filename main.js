const { app, BrowserWindow } = require('electron')
const ipcMain = require('electron').ipcMain;

let sivu = "kalataulu.html"

function createWindow () {
	const win = new BrowserWindow({
    	width: 800,
    	height: 600,
    	webPreferences: {
      	nodeIntegration: true
    	}
	})

	win.loadFile('index.html')

  	ipcMain.on('load-page', (event, arg) => {
    	win.loadFile(arg);
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


