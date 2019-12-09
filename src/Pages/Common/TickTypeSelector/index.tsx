import * as React from "react";
import {DropDown} from "react-lite-form-creator";
import {BoxDropDownItem} from "react-lite-form-creator/dist/Form/DropDown";
import {TickType, TickTypeColors, TickTypeIcons, TickTypeNames} from "../../../Redux/DataState/Tasks/Models/TickInfo";
import Icon from "react-icons-kit";
import './style.css';

interface Props {
    selectedValue?: TickType | 'all';
    onChange: (e: { newValue: TickType }) => void;
}

const TickTypeSelector = (props: Props) => {
    let items = [TickType.todo, TickType.doing, TickType.done, TickType.canceled, TickType.postponed].map(type => ({
        value: type,
        title: TickTypeNames[type],
        content: <span style={{color: TickTypeColors[type]}}>
                <Icon icon={TickTypeIcons[type]}/>
            {' '}
            {TickTypeNames[type]}
            </span>,
    }) as BoxDropDownItem);

    items = [
        {
            title: 'همه تیک‌ها',
            value: undefined,
        }, {
            value: 'all',
            title: 'تیک‌های فعال',
            content: <span style={{color: 'black'}}>
                {[TickType.todo, TickType.doing, TickType.postponed].map(type => <React.Fragment key={type}>
                    <Icon icon={TickTypeIcons[type]}
                          style={{color: TickTypeColors[type]}}/>
                    {' '}
                </React.Fragment>)}
                تیک‌های فعال
            </span>,
        },
        ...items
    ];

    return <DropDown name="TickTypeSelector"
                     value={props.selectedValue}
                     className="tick-type-selector info"
                     items={items} label="نوع تیک"
                     onChange={e => props.onChange({newValue: e.newValue})}/>
};

export default TickTypeSelector;