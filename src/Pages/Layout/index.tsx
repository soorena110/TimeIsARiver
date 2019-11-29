import * as React from "react";
import './style.css';
import Header from "../Header";


export default function Layout(props: any) {
    return <div className="layout">
        <header className="layout-header">
            <Header/>
        </header>
        <div className="layout-body">
            {props.children}
        </div>
    </div>
}