const TrayManager = require("./TrayManager");
const MainWindow = require("./MainWindow");

const {app} = require('electron');

app.on('ready', () => {
    require('devtron').install();

    TrayManager.create();
    MainWindow.create();
    require('./NotificationManager').start();
});
