import * as React from 'react';

interface Props {
    name: string;
    unmountChildrenWhenError?: boolean;
}

interface State {
    hasError: boolean;
}


class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error: any, info: any) {
        return {hasError: true};
    }

    componentDidCatch(error: any, info: any) {
        console.groupCollapsed(`%cA Caught Error Has Been Happend in %c${this.props.name} `, 'color:red; padding:5px;', 'color:red; padding:5px; border:solid 1px red');
        console.log('where', this.props.name);
        console.log('error', error);
        console.log('info', info);
        console.groupEnd();
        if (!this.state.hasError && this.props.unmountChildrenWhenError)
            this.setState({hasError: true});
    };

    render() {
        if (!this.state.hasError)
            return this.props.children;
        return <span onClick={() => this.setState({hasError: false})}>error</span>
    }
}

export default function withErrorBoundary<TComponent>(WrappedComponent: TComponent) {

    const name = (WrappedComponent as any).displayName || (WrappedComponent as any).name;
    const forwardRef = React.forwardRef((props: any, ref) => {
        return <ErrorBoundary name={name}>
            {React.createElement(WrappedComponent as any, {...props, ref: ref})}
        </ErrorBoundary>;
    });

    forwardRef.displayName = `withErrorBoundary(${name})`;
    return forwardRef as any as TComponent;
}