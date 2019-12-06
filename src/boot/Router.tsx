import * as React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import TasksPage from '../Pages/TasksPage';
import TasksOfDay from "../Pages/TasksOfDay";
import TicksPage from "../Pages/TicksPage";


export default class Routes extends React.Component {
    render() {
        return <Switch>
            <Route exact path="/tasks" component={TasksPage}/>
            <Route exact path="/ticks" component={TicksPage}/>
            <Route exact path="/:date?" component={TasksOfDay}/>
            <Redirect from={'*'} to="/" path="/"/>
        </Switch>;
    }
}
