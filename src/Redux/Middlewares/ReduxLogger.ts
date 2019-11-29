import GlobalMethods from "../../Services/GlobalMethods";

const win = (window as any);
if (!win.$trace)
    win.$trace = {};

const reduxLoggerSettings = {
    logs: {} as any,
    storeNames: [] as string[]
};

win.$trace.redux = {
    settings: reduxLoggerSettings,
    setLogEnablity(verb: string, enablity: boolean) {
        localStorage.setItem('log' + verb, enablity ? 'true' : 'false');
    },
};

const addStoreName = (name: string) => {
    if (reduxLoggerSettings.storeNames.indexOf(name) != -1)
        return;

    reduxLoggerSettings.storeNames.push(name);
    reduxLoggerSettings.storeNames.forEach(verb => {
        reduxLoggerSettings.logs[verb] = (localStorage.getItem('log' + verb) || 'false') == 'true';
        win.$trace.redux[verb + 'Off'] = () => win.$trace.redux.setLogEnablity(verb, false);
        win.$trace.redux[verb + 'On'] = () => win.$trace.redux.setLogEnablity(verb, true);
    });
};


export const ReduxLoggerWithOption = (name: string, options?: { loggingColor?: string }) => {
    const color = options && options.loggingColor || '#9900FF';
    addStoreName(name);

    return (store: any) => (next: any) => (action: any) => {
        const shouldLog = reduxLoggerSettings.logs[name];
        if (shouldLog) {
            const type = Array.isArray(action) ? action.map(a => a.type).join(', ') : action.type;
            console.groupCollapsed && console.groupCollapsed('%c Redux  %c ' + type, 'background:' + color, 'color:#' + GlobalMethods.wordSudoColor(action.type));
            console.info('dispatching', action);
            console.log('prev state', store.getState());
        }
        let result = next(action);
        if (shouldLog) {
            console.log('next state', store.getState());
            console.groupEnd && console.groupEnd();
        }
        return result
    };
};

const ReduxLogger = ReduxLoggerWithOption('global');

export default ReduxLogger;