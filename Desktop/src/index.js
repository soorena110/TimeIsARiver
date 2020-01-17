import TrayManager from "./TrayManager";
import MainWindow from "./MainWindow";

const {app} = require('electron');

app.on('ready', () => {
    require('devtron').install();

    TrayManager.create();
    MainWindow.create();
    require('./NotificationManager').default.start();
});
