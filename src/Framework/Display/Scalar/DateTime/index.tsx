import * as React from "react";
import Persian from "persian-info";
import './style.css';

type ValidDateTimeType = string | number | Date;

interface Props {
    calendarType?: 'jalali';
    type?: 'dateOnly' | 'datetime' | 'timeOnly';
    dateFormat?: string;
    timeFormat?: string;
    className?: string;
    emptyText?: string;
    children?: ValidDateTimeType;
}

export default class DateTime extends React.Component<Props> {

    static defaultProps: Partial<Props> = {
        calendarType: "jalali",
        type: 'datetime',
        timeFormat: 'hh:mm:ss'
    };

    private _getDateTimeGap() {
        if (this.props.type == 'datetime')
            return <React.Fragment>&nbsp;</React.Fragment>
    }

    private _getTimeString(dateTime: ValidDateTimeType) {
        if (this.props.type == 'dateOnly' || !this.props.timeFormat)
            return;

        const dateObject = typeof dateTime == 'object' ? dateTime : new Date(dateTime);
        return this.props.timeFormat
            .replace('hh', dateObject.getHours().toString().padStart(2, '0'))
            .replace('h', dateObject.getHours().toString())
            .replace('mm', dateObject.getMinutes().toString().padStart(2, '0'))
            .replace('m', dateObject.getMinutes().toString())
            .replace('ss', dateObject.getSeconds().toString().padStart(2, '0'))
            .replace('s', dateObject.getSeconds().toString())
            .replace('SSS', dateObject.getMilliseconds().toString().padStart(2, '0'))
    }

    private _getDateString(dateTime: ValidDateTimeType) {
        if (this.props.type == 'timeOnly')
            return;

        if (this.props.calendarType == 'jalali')
            return Persian.date.convertDateTimeToJalaliString(dateTime, this.props.dateFormat);
        return dateTime;
    }

    render() {
        const dateTime = this.props.children;
        if (dateTime == undefined)
            return <span className={'datetime-empty ' + (this.props.className || '')}>
                {this.props.emptyText}
            </span>;

        return <span lang="datetime" className={this.props.className}>
            {this._getDateString(dateTime)}
            {this._getDateTimeGap()}
            {this._getTimeString(dateTime)}
        </span>
    }
}