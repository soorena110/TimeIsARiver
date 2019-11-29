import * as React from "react";
import './style.css';
import {NavLink} from "react-router-dom";


export default function Header() {
    return <>
        <NavLink className="header-nav-link" to="/">تسک روز</NavLink>
        <NavLink className="header-nav-link" to="/all">همه تسک ها</NavLink>
        <NavLink className="header-nav-link" to="/ticks">همه تیک ها</NavLink>
    </>
}