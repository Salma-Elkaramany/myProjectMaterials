
import '../../../assets/admin/events.scss';

import Input from '../../base_component/input';
import Button from '../../base_component/button';
import {useState} from 'react';
import AddModal from './addModal';
import DeleteModal from './deleteModal';
import ModifyModal from './modifyModal';
import ViewEvents from './view_events';
import { ToastContainer, toast } from 'react-toastify';
const toastStyle = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    color: true,
}

const ManageEvents = () => {

    const [addEvent, setAddEvent] = useState(false);
    const [deleteEvent, setDeleteEvent] = useState(false);
    const [modifyEvent, setModifyEvent] = useState(false);
    const [viewEvent, setViewEvent] = useState(false);
    const [addModal, setAddModal] = useState(0);
    const [deleteModal, setDeleteModal] = useState(0);
    const [modifyModal, setModifyModal] = useState(0);
    const [viewModal, setViewModal] = useState(0);
    function update() {
        if(addEvent == true) {
            if(deleteEvent == true || modifyEvent == true || viewEvent == true) {
                toast.warning('You must select only one', toastStyle);
                return;
            }
            setAddModal(1);
        }

        if(deleteEvent == true) {
            if(addEvent == true || modifyEvent == true || viewEvent == true) {
                toast.warning('You must select only one', toastStyle);
                return;
            }
            setDeleteModal(1);
        }

        if(modifyEvent == true) {
            if(addEvent == true || deleteEvent == true || viewEvent == true) {
                toast.warning('You must select only one', toastStyle);
                return;
            }
            setModifyModal(1);
        }

        if(viewEvent == true) {
            if(addEvent == true || deleteEvent == true || modifyEvent == true) {
                toast.warning('You must select only one', toastStyle);
                return;
            }
            setViewModal(1);
        }
    }

    return (
        <div className="events">
            <ToastContainer />
            <div className="total"> 
                <div className="header">
                    <p>Events dashboard</p>
                </div>
                <div className="body">
                    <div className="property">
                        <div>
                            <Input 
                                val={addEvent}
                                type="checkbox"
                                name="addEvent"
                                id="addEvent"
                                placeholder=""
                                cls="input check"
                                checked={addEvent}
                                change={(val) => {setAddEvent(val)}}
                            />
                            <span>Add Event</span>
                        </div>
                    </div>
                    <div className="property mt-5">
                        <div>
                            <Input 
                                val={deleteEvent}
                                type="checkbox"
                                name="department"
                                id="department"
                                placeholder=""
                                checked={deleteEvent}
                                cls="input check"
                                change={(val) => {setDeleteEvent(val)}}
                            />
                            <span>Delete Event</span>
                        </div>
                    </div> 
                    <div className="property mt-5">
                        <div>
                            <Input 
                                val={modifyEvent}
                                type="checkbox"
                                name="department"
                                id="department"
                                placeholder=""
                                cls="input check"
                                checked={modifyEvent}
                                change={(val) => {setModifyEvent(val)}}
                            />
                            <span>Modify Event</span>
                        </div>
                    </div> 
                    <div className="property mt-5">
                        <div>
                            <Input 
                                val={viewEvent}
                                type="checkbox"
                                name="viewEvent"
                                id="viewEvent"
                                placeholder=""
                                cls="input check"
                                checked={viewEvent}
                                change={(val) => {setViewEvent(val)}}
                            />
                            <span>View Event</span>
                        </div>
                    </div>                      
                </div>
                <Button
                    val="Update"
                    cls="button update mt-5"
                    type="button"
                    click={() => update()}
                />
            </div>
            {
                addModal == 1 && 
                    <AddModal close={(val) => setAddModal(0)}/>
            }
            {
                deleteModal == 1 && 
                    <DeleteModal close={(val) => setDeleteModal(0)}/>
            }
            {
                modifyModal == 1 && 
                    <ModifyModal close={(val) => setModifyModal(0)} />
            }
            {
                viewModal == 1 && 
                    <ViewEvents close={(val) => setViewModal(0)} />
            }
        </div>
    );
}

export default ManageEvents;