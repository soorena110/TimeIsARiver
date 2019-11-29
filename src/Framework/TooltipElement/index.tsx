import * as React from "react";
//@ts-ignore
import Tooltip from 'react-tooltip-lite';
import './style.css';

interface Props {
    tooltip: React.ReactNode;
    elementType?: 'div' | 'td' | 'span';
    style?: React.CSSProperties;
    className?: string;
    basic?: boolean;
    mouseEnterDelay?: number;
}

export default class TooltipElement extends React.Component<Props> {

    static defaultProps: Partial<Props> = {
        elementType: 'div',
        mouseEnterDelay: 0
    };

    render() {
        const ElementType = this.props.elementType as any;
        return <Tooltip
            content={(
                <div className="tooltip-element-text tooltip-element" style={{direction: 'rtl'}}>
                    {this.props.tooltip}
                </div>
            )}
            arrow={this.props.basic}
            hoverDelay={this.props.mouseEnterDelay}
            className="tooltip-container"
            tagName="span"
            styles={this.props.style}
        >
            <ElementType className={this.props.className} style={this.props.style}>
                {this.props.children}
            </ElementType>
        </Tooltip>
    }
}