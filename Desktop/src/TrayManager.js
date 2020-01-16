const {Tray, Menu} = require('electron');

const TrayManager = {
    tray: null,
    create() {
        this.tray = new Tray('./src/app.png');
        const contextMenu = Menu.buildFromTemplate([{role: 'quit'}]);
        this.tray.setContextMenu(contextMenu);
        this.tray.setToolTip('Time is the coolest guy :))');
        this.tray.setTitle('Time River');

        this.tray.on('click', () => {
            const win = global.mainWindow;
            if (!win) return;

            win.isVisible() ? win.hide() : win.show();
        })
    }
};

export default TrayManager;