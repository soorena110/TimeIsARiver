import * as React from "react";
import {useState} from "react";
import './style.css';
import Header from "../Header";
import Services from "../../Services";


export default function Layout(props: any) {
    const [syncIsDone, setSyncIsDone] = useState(false);

    if (!syncIsDone) {
        Services.tasksService.syncTaskAndTicksChangesToServer().then(() => {
            setSyncIsDone(true);
            requestNotifictaionPermission();
        });
        return <div>syncing</div>;
    }

    return <div className="layout">
        <header className="layout-header">
            <Header/>
        </header>
        <div className="layout-body">
            {props.children}
        </div>
    </div>
}


const requestNotifictaionPermission = () => {
    if (!('serviceWorker' in navigator))
        return console.error('push notification system does not exist.');

    return Notification.requestPermission();
};