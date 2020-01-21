import * as React from "react";
import {render} from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import reduxStore from "../Redux";
import Routes from "./Router";
import Layout from "../Pages/Layout";
import "./style.css";
import Services from "../Services";

class MainApplication extends React.Component {
    render() {
        return <BrowserRouter>
            <Provider store={reduxStore}>
                <Layout>
                    <Routes/>
                </Layout>
            </Provider>
        </BrowserRouter>
    }
}

render(
    <MainApplication/>,
    document.getElementById("root")
);

declare const module: any;
if (module.hot)
    module.hot.accept('./index.tsx');

Services.backgroundService.startCheckingTasksNotification();

