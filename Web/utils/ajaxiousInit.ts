import Ajaxious from "ajaxious";

export const initServerSetting = () => {
    Ajaxious.baseHeaders = {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
    };
    Ajaxious.basePath = localStorage.getItem('url') || 'https://time.sainapedia.ir/api';
};