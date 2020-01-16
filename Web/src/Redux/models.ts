import TasksState from "./DataState/Tasks/Models";
import CommonPagesState from "./PageState/Models";

export interface ApplicationState {
    tasks: TasksState;
    pages: CommonPagesState;
}
