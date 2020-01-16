import {initServerSetting} from "../../utils/ajaxiousInit";
import {tasksService} from "./DataActions/Tasks";
import {pagesService} from "./PagesActions";

const Services = {
    tasksService,
    pagesService
};

initServerSetting();

(window as any).$services = Services;
export default Services

if ((module as any).hot)
    (module as any).hot.accept('./index.ts');