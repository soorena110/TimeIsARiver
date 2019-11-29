import * as React from "react";
import {Button, Modal} from "react-lite-form-creator";
import {ApplicationState} from "../../../Redux";
import {connect} from "react-redux";
import {TaskInfo} from "../../../Redux/DataState/Tasks/Models/TaskInfo";
import Icon from "react-icons-kit";
import Services from "../../../Services";

const {trash} = require('react-icons-kit/fa/trash');

interface Props {
    id: number;

    editingTask?: TaskInfo;
}

function DeleteTaskView(props: Props) {
    if (!props.editingTask)
        return null;

    let modalRef: Modal | null;

    return <Modal ref={ref => modalRef = ref}
                  trigger={<Icon icon={trash} className="text-gray"/>}>
        <Modal.Header theme="balloon" className="danger">
            حذف تسک "{props.editingTask.name}"
        </Modal.Header>
        <Modal.Body>آیا مطمئنید که میخواهید این تسک حذف شود ؟</Modal.Body>
        <Modal.Footer>
            <Button className="danger" style={{marginRight: 5}}
                    onClick={() => Services.tasksService.deleteTask(props.id)}>
                حذف شود
            </Button>
            <Button onClick={() => modalRef && modalRef.close()} className="gray-light">انصراف</Button>
        </Modal.Footer>
    </Modal>
}


const mapStateToProps = (state: ApplicationState, ownProps: { id: number }) => {
    return {
        editingTask: state.tasks.tasks && ownProps.id != undefined && state.tasks.tasks[ownProps.id]
    }
};
export default connect(mapStateToProps)(DeleteTaskView);