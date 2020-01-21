import windowStateKeeper from "electron-window-state";
import {BrowserWindow} from 'electron'

const createMainWindow = () => {
    const prevState = windowStateKeeper({
        defaultWidth: 1024,
        defaultHeight: 768
    });

    const mainWindow = new BrowserWindow({
        ...prevState,
        icon: './src/app.png',
        autoHideMenuBar: true,
        webPreferences: {
            webviewTag: true,
            webSecurity: false,
            allowRunningInsecureContent: true,
            nodeIntegration: true
        },
        show: false
    });
    prevState.manage(mainWindow);
    mainWindow.loadFile('./src/index.html');
    mainWindow.hide();
    return mainWindow;
};

const hideInsteadOfClose = e => {
    if (!global.isQuiting) {
        mainWindow.hide();
        e.preventDefault();
    }
};


const MainWindow = {
    create() {
        const mainWindow = createMainWindow();
        mainWindow.on('close', hideInsteadOfClose);

        global.mainWindow = mainWindow;
    }
};


export default MainWindow;