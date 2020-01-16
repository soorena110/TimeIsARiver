const windowStateKeeper = require("electron-window-state");
const {app, BrowserWindow} = require('electron');

// const webUrl = 'https://time.sainapedia.ir';
const webUrl = 'http://localhost:7000';

app.on('ready', () => {
    require('devtron').install();
    const prevState = windowStateKeeper({
        defaultWidth: 1024,
        defaultHeight: 768
    });

    const mainWindow = new BrowserWindow({...prevState});
    prevState.manage(mainWindow);
    mainWindow.loadURL(webUrl)
});
