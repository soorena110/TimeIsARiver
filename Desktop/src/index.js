import TrayManager from "./TrayManager";
import MainWindow from "./MainWindow";

const {app} = require('electron');


app.on('ready', () => {
    TrayManager.create();
    MainWindow.create();
});
