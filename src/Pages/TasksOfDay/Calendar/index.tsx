import * as React from "react";
import withErrorBoundary from "../../../Framework/ErrorBoundry";
import {DatePicker} from 'react-persian-simple-calendar';
import {RouteComponentProps, withRouter} from "react-router-dom";
import Persian from "persian-info";

interface Props extends RouteComponentProps<{ 'date': string }> {
}

@withErrorBoundary
class Calendar extends React.Component<Props> {

    _getDate() {
        if (this.props.match.params.date)
            return this.props.match.params.date.replace(/-/g, '/');
        return Persian.date.convertDateTimeToJalaliString();
    }

    _setDate(date: string) {
        this.props.history.push('/' + date.replace(/\//g, '-'))
    }

    render() {
        return <span style={{display: "inline-block", border: 'solid 1px lightgray'}}>
            <DatePicker selectedDay={this._getDate()} onDaySelected={e => this._setDate(e.selectedDay)}/>
        </span>
    }
}

export default withRouter(Calendar);


declare const module: any;
module.hot.accept();