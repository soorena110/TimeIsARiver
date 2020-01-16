const {Tray, Menu, app} = require('electron');

const createTrayIconContextMenuTemplate = () => {
    return Menu.buildFromTemplate([{
        label: 'Exit',
        click(){
            global.isQuiting = true;
            app.quit();}
    }]);
};

const createTrayIcon = () => {
    const contextMenu = createTrayIconContextMenuTemplate();

    const tray = new Tray('./src/app.png');
    tray.setContextMenu(contextMenu);
    tray.setToolTip('Time is the coolest guy :))');
    tray.setTitle('Time River');

    return tray;
};

const toggleMainWindowVisibility = () => {
    const win = global.mainWindow;
    if (!win) return;

    win.isVisible() ? win.hide() : win.show();
};

const TrayManager = {
    tray: null,
    create() {
        this.tray = createTrayIcon();

        this.tray.on('click', toggleMainWindowVisibility)
    }
};

export default TrayManager;