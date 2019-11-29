import {initServerSetting} from "./SourceManament/init";
import {tasksService} from "./DataActions/Tasks";
import {pagesService} from "./PagesActions";

const Services = {
    tasksService,
    pagesService
};

initServerSetting();

(window as any).$services = Services;
export default Services

if ((module as any))
    (module as any).hot.accept('./index.ts');