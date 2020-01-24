const {Tray, Menu, app} = require('electron');
const path = require('path');
const AutoLaunch = require('auto-launch');

const autoLaunch = new AutoLaunch({
    name: 'TimeRiver'
});

const createTrayIconContextMenuTemplate = async () => {
    const isAutoLaunched = await autoLaunch.isEnabled();

    return Menu.buildFromTemplate([{
        label: 'Exit',
        click() {
            global.isQuiting = true;
            app.quit();
        }
    }, {
        label: (isAutoLaunched ? '✔' : '') + ' Auto Lunch',

        async click() {
            if (!isAutoLaunched)
                autoLaunch.enable();
            else autoLaunch.disable();
            setContextMenuOfTrayIcon();
        }
    }]);
};

const setContextMenuOfTrayIcon = async () => {
    const contextMenu = await createTrayIconContextMenuTemplate();
    global.tray.setContextMenu(contextMenu);
};

const createTrayIcon = () => {

    const tray = new Tray(path.join(__dirname, './app.png'));
    tray.setToolTip('Time is the coolest guy :))');
    tray.setTitle('Time River');


    global.tray = tray;
    setContextMenuOfTrayIcon();

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

module.exports = TrayManager;