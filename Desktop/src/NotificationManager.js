const {ipcMain} = require('electron');
const eNotify = require('electron-notify');
const path = require('path');


const showMainWindowVisibility = () => {
    const win = global.mainWindow;
    if (win) win.show();
};

const notify = (content) => {
    eNotify.setConfig(getNotificationConfig(content.type));
    eNotify.notify({
        title: content.title +
            '<span style="color:gray; float: left">' + content.remainingTime + 'دقیقه' + '</span>',
        text: content.description,
        onClickFunc() {
            showMainWindowVisibility();
            this.hide();
        }
    });
};

const getNotificationConfig = (type) => {
    return {
        appIcon: path.join(__dirname, 'app.png'),
        displayTime: 30000,
        height: 120,
        width: 400,
        padding: -5,
        borderRadius: 0,
        defaultStyleContainer: {
            backgroundColor: 'white',
            overflow: 'hidden',
            padding: 8,
            boxSizing: 'border-box',
            border: '1px solid purple',
            fontFamily: '\"IRANSans(FaNum)\"',
            fontSize: 14,
            position: 'relative',
            direction: 'rtl',
            boxShadow: '0 0 5px 1px #888',
            color: type === 'info' ? 'black' : 'red'
        },
        defaultStyleAppIcon: {
            overflow: 'hidden',
            float: 'right',
            height: 85,
            width: 85,
            marginLeft: 10,
            opacity: .8
        },
        defaultStyleImage: {
            overflow: 'hidden',
            float: 'right',
            height: 85,
            width: 85,
            marginRight: 10,
        },
        defaultStyleClose: {
            position: 'absolute',
            top: 1,
            right: 3,
            fontSize: 11,
            cursor: 'pointer',
            color: 'purple'
        },
        defaultStyleText: {
            margin: 0,
            overflow: 'hidden',
            cursor: 'default',
            fontSize: '.7em',
            fontWeight: 'bold',
            color: '#ccc'
        },
    }
};

const NotificationManager = {
    start() {
        ipcMain.on('notify', (e, content) => notify(content));
    }
};

module.exports = NotificationManager