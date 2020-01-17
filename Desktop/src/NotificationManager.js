import {ipcMain} from 'electron';
import eNotify from 'electron-notify';
import path from 'path';
import {Howl} from 'howler';


const showMainWindowVisibility = () => {
    const win = global.mainWindow;
    if (win) win.show();
};

const notify = (content) => {
    eNotify.notify({
        title: content.title + '<span style="color:gray; float: left">' + content.remainingTime + 'دقیقه' + '</span>',
        text: content.description,
        sound: path.join(__dirname, '../../Common/Sound/eventually.wav'),
        onClickFunc() {
            showMainWindowVisibility();
            this.hide();
        }
    });
};

const notificationConfig = {
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
        boxShadow: '0 0 5px 1px #888'
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
};

const NotificationManager = {
    start() {
        eNotify.setConfig(notificationConfig);

        ipcMain.on('notify', (e, content) => notify(content));
        const sound = new Howl({
            src: ['./eventually.mp3'],
            autoplay: true,
            loop: true,
            volume: 0.5,
        });
        sound.play();
    }
};

export default NotificationManager;