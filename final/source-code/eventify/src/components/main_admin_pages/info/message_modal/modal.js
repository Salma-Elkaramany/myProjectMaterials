
import '../../../../assets/modal.scss';
import axios from 'axios';
import {useState, useEffect} from 'react';
import DescModal from './desc_modal';
import Button from '../../../base_component/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import serverRouter from '../../../../serverRouter';
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
const MsgModal = ({close}) => {

    const [data, setData] = useState([]);
    const [desc, setDesc] = useState(-1);
    const email = sessionStorage.getItem('email');
    const [showData, setShowData] = useState(1);
    useEffect(() => {
        if(showData == 1) {
            axios.get(`${serverRouter}admin/processing_event`)
            .then((response) => {
                setData(response.data);
            })
            setShowData(2);
        }
    }, [showData]);

    function delete_cancel (id) {
        const data = {id, delete: 0, email};
        axios.post(`${serverRouter}admin/event_action`, data)
            .then((response) => {
                setShowData(1);
                toast.success('Delete request cancelled.', toastStyle);
            })
    }

    function delete_confirm (id) {
        const data = {id, delete: 1, email};
        axios.post(`${serverRouter}admin/event_action`, data)
            .then((response) => {
                setShowData(1);
                toast.success('Delete request allowed.', toastStyle);
            })
    }

    return (
        <div id="myModal" className="modal admin_msg_modal">
            <ToastContainer />
            <div className="modal-content">
                <span className="close" onClick={() => close()}>&times;</span>
                <div className="events">
                    {
                        data.length == 0 ?
                            <h2>No deleted event.</h2> : 
                            data.map((event, index) => {
                                return (
                                    <div className="event mt-3">
                                        <div><p>Event ID:</p><span>{event.id}</span></div>
                                        <div><p>Event type:</p><span>{event.type}</span></div>
                                        <div><p>Event organiser:</p><span>{event.organiser}</span></div>
                                        <div><p>Delete description:</p><span onClick={() => setDesc(index)}><i className="bi bi-eye"></i></span></div>
                                        <div className="action">
                                            <Button
                                                val="cancel"
                                                cls="button confirm_btn"
                                                type="button"
                                                click={() => delete_cancel(event.id)}
                                            />
                                            <Button
                                                val="Delete"
                                                cls="button delete"
                                                type="button"
                                                click={() => delete_confirm(event.id)}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                    }
                </div>

            </div>
            {
                desc != -1 && <DescModal description={data[desc].delet_desc} close={() => setDesc(-1)} />
            }
        </div>
    );
}

export default MsgModal;