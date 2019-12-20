import Ajaxious from "ajaxious";

export const initServerSetting = () => {
    Ajaxious.baseHeaders = {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
    };
    Ajaxious.basePath = 'https://time.sainapedia.ir/api';
};