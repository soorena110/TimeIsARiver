import TrayManager from "./TrayManager";
import MainWindow from "./MainWindow";

const {app, ipcMain} = require('electron');


app.on('ready', () => {
    TrayManager.create();
    MainWindow.create();

    ipcMain.on('notify', (e, content) => console.log(content))
});
