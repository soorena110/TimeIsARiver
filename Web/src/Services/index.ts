import {initServerSetting} from "../../utils/ajaxiousInit";
import {tasksService} from "./DataActions/Tasks";
import {pagesService} from "./PagesActions";
import {backgroundService} from "./BackgroundActions";

const Services = {
    tasksService,
    pagesService,
    backgroundService
};

initServerSetting();

(window as any).$services = Services;
export default Services

if ((module as any).hot)
    (module as any).hot.accept('./index.ts');