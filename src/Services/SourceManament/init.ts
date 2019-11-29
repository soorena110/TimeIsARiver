import Ajaxious from "ajaxious";
import {ModeManagement} from "web-event";

export const initServerSetting = () => {
    Ajaxious.baseHeaders = {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
    };
    ModeManagement.add('restServerUrl', window.location.origin + '/api');
    Ajaxious.basePath = ModeManagement.get('restServerUrl');
};