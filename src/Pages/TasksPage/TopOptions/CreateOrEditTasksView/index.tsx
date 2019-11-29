import * as React from "react";
import {connect} from "react-redux";
import {ApplicationState} from "../../../../Redux";
import {TaskInfo} from "../../../../Redux/DataState/Tasks/Models/TaskInfo";
import Icon from "react-icons-kit";
import {Button, Modal, ScrollbarContainer} from "react-lite-form-creator";
import CreateOrEditForm from "./CreateOrEditForm";

const {pencil} = require('react-icons-kit/fa/pencil');

interface Props {
    editingTask?: TaskInfo;
    isMinifiedButton?: boolean;
}


class CreateOrEditTasksView extends React.Component<Props> {
    _form?: CreateOrEditForm;
    _modal?: Modal | null;


    _renderButton() {
        if (!this.props.isMinifiedButton)
            return <Button className="success">ایجاد تسک جدید</Button>;

        return <Icon icon={pencil} className="text-gray"/>
    }

    render() {
        return <Modal trigger={this._renderButton()} ref={ref => this._modal = ref}>
            <Modal.Header className="success">ایجاد تسک جدید</Modal.Header>
            <Modal.Body>
                <ScrollbarContainer style={{height: 300, paddingRight: 20, paddingLeft: 20}}>
                    <CreateOrEditForm editingTask={this.props.editingTask}
                                      ref={(ref: any) => this._form = ref}/>
                </ScrollbarContainer>
            </Modal.Body>
            <Modal.Footer>
                <Button className="success" style={{marginRight: 5}}
                        onClick={async () => {
                            const isDone = this._form && await this._form.submit();
                            if (isDone)
                                this._modal && this._modal.close();
                        }}>ایجاد شود</Button>
                <Button className="gray-light" style={{marginRight: 20}}
                        onClick={() => this._modal && this._modal.close()}>انصراف</Button>
            </Modal.Footer>
        </Modal>
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: { id?: number }) => ({
    editingTask: state.tasks.tasks && ownProps.id != undefined && state.tasks.tasks[ownProps.id]
});
export default connect(mapStateToProps)(CreateOrEditTasksView);