import * as React from 'react';
import {ReactNode} from 'react';
import Persian from "persian-info";
import './style.scss';


export interface SorTableColumn<T = any> {
    accessor: keyof T;
    title: ReactNode;
    render?: (value: any, row: T, ix: number) => ReactNode;
    sortable?: boolean;

    style?: React.CSSProperties;
    tdStyle?: React.CSSProperties;
    thStyle?: React.CSSProperties;

    className?: string;
    tdClassName?: string;
    thClassName?: string;
}

interface Props<T = any> {
    columns: SorTableColumn<T>[];
    data: T[];
    hasHeaderBorder?: boolean;
    isHoverable?: boolean;
    isSelectable?: boolean;
    selectedDataRow?: T;

    className?: string;
    trClassName?: string;
    onSelect?: (e: { rowData: T }) => void;
    defaultSortIndex?:number;
}

interface State<T> {
    selectedDataRow?: T;
    sortByIndex?: number;
    sortDesc: boolean;
}


export default class SorTable<T> extends React.Component<Props<T>, State<T>> {
    constructor(props: Props<T>) {
        super(props);
        this.state = {
            sortByIndex:props.defaultSortIndex,
            sortDesc: false
        };
    }

    static defaultProps: Partial<Props> = {
        isHoverable: true
    };

    componentWillReceiveProps(nextProps: Props<T>) {
        if (nextProps.selectedDataRow && nextProps.selectedDataRow != this.props.selectedDataRow)
            this.setState({selectedDataRow: nextProps.selectedDataRow});
    }

    setSelectedIndex(dataRow: T) {
        if (!this.props.isSelectable || dataRow == this.state.selectedDataRow)
            return;

        if (this.props.onSelect)
            this.props.onSelect({rowData: dataRow});
        this.setState({selectedDataRow: dataRow});
    }

    private _setSortByIndex(index: number) {
        let sortDesc = this.state.sortDesc;
        let sortByIndex = this.state.sortByIndex;

        if (index != sortByIndex) {
            sortByIndex = index;
            sortDesc = false;
        } else if (!sortDesc) {
            sortDesc = true;
        } else {
            sortByIndex = undefined;
            sortDesc = false;
        }

        this.setState({sortDesc, sortByIndex})
    }

    private _getTableClass() {
        return "oa-table " + (this.props.className ? this.props.className + ' ' : '') +
            (this.props.hasHeaderBorder ? 'oa-table-light-border ' : '') +
            (this.props.isHoverable ? 'oa-table-hover ' : '')
    }

    private _getData() {
        const {sortByIndex} = this.state;
        let {data} = this.props;
        if (sortByIndex != undefined) {
            const accessor = this.props.columns[sortByIndex].accessor;
            data = [...data].sort((d1, d2) => {
                const sortDescFactor = this.state.sortDesc ? 1 : -1;
                const orderSign = compare(d1[accessor], d2[accessor]);
                return orderSign * sortDescFactor
            });
        }
        return data;
    }

    private _renderHeader() {
        return <thead>
        <tr className="gray-text">
            {this.props.columns.map((head, ix) => {
                const style = Object.assign(head.style || {}, head.thStyle);
                const className = (head.className ? head.className + ' ' : '') +
                    (head.thClassName ? head.thClassName + ' ' : '') +
                    (head.sortable ? 'sortable' : '');

                return <th style={style} key={ix}
                           className={className}
                           onClick={head.sortable ? (() => this._setSortByIndex(ix)) : undefined}>
                    {head.title}
                    <span style={{position: 'absolute'}}>
                        {ix == this.state.sortByIndex && (this.state.sortDesc ? '▲' : '▼')}
                     </span>
                </th>
            })}
        </tr>
        </thead>
    }

    private _renderBody() {
        const data = this._getData();
        return <tbody>
        {data.map((dataRow: T, ix) => {

            const trClassName = (this.props.trClassName ? this.props.trClassName + ' ' : '') +
                (dataRow == this.state.selectedDataRow ? 'selected' : 'selectable');

            return <tr key={ix} onClick={() => this.setSelectedIndex(dataRow)}
                       className={trClassName}>
                {this.props.columns.map((col, cix) => {
                    const value = dataRow[col.accessor] as any;
                    const content = col.render ? col.render(value, dataRow, ix) : value;
                    const style = Object.assign(col.style || {}, col.tdStyle);
                    const className = (col.className ? col.className + ' ' : '') +
                        (col.tdClassName ? col.tdClassName + ' ' : '');

                    return <td key={cix} style={style} className={className}>{content}</td>
                })}
            </tr>
        })}
        </tbody>
    }

    render() {
        return <table className={this._getTableClass()} cellSpacing={0}>
            {this._renderHeader()}
            {this._renderBody()}
        </table>
    }
}

const compare = (a: any, b: any): 1 | 0 | -1 => {
    if (typeof a == "string")
        return Persian.letter.compareString(a, b);

    if(a == undefined && b == undefined)
        return 0;

    if (b == undefined || a > b) return 1;
    if (a == undefined || a < b) return -1;
    return 0;
};