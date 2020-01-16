import windowStateKeeper from "electron-window-state";
import {BrowserWindow} from 'electron'

// const webUrl = 'https://time.sainapedia.ir';
const webUrl = 'http://localhost:7000';

const MainWindow = {
    create() {
        require('devtron').install();
        const prevState = windowStateKeeper({
            defaultWidth: 1024,
            defaultHeight: 768
        });

        const windowOptions = Object.assign({icon: './src/app.png', autoHideMenuBar: true}, prevState);
        const mainWindow = new BrowserWindow(windowOptions);
        prevState.manage(mainWindow);
        mainWindow.loadURL(webUrl);
        mainWindow.on('close', e => {
            mainWindow.hide();
            e.preventDefault();
        });

        global.mainWindow = mainWindow;
    }
};

export default MainWindow;