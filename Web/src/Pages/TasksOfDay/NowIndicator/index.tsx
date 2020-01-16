import * as React from "react";
import './styles.css';
import {RouteComponentProps, withRouter} from "react-router-dom";
import Persian from "persian-info";
import {getDateFromDateTime} from "../../../../utils/dateTimeUtils";

interface Props extends RouteComponentProps<{ 'date': string }> {
}

class NowIndicator extends React.Component<Props> {
    _interval: any;

    constructor(props: Props) {
        super(props);
        this._interval = setInterval(() => {
            this.setState({});
        }, 30 * 1000);
    }

    componentWillUnmount(): void {
        clearInterval(this._interval);
    }


    _getDate() {
        const theDateString = this.props.match.params.date;
        if (!theDateString)
            return getDateFromDateTime(new Date());

        const [year, month, day] = theDateString.split('-').map(r => parseInt(r));
        return Persian.date.convertJalaliToGregorian({year, month, day})
    }

    render() {
        const endDay = 24 * 3600 * 1000;
        const dateDiff = new Date().valueOf() - this._getDate().valueOf();
        if (dateDiff > 0 && dateDiff < endDay)
            return <div className="now-line-indicator" style={{right: dateDiff / endDay * 100 + '%'}}/>;
        return null;
    }
}

export default withRouter(NowIndicator)