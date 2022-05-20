
import '../../../../assets/modal.scss';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Button from '../../../base_component/button';
import 'react-toastify/dist/ReactToastify.css';
import serverRouter from '../../../../serverRouter';
import ConfirmModal from '../../confirm_modal';
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

const MsgModal = ({close}) => {

    const [data, setData] = useState([]);
    const [confirm, setConfirm] = useState(0);
    const [id, setId] = useState(0);
    useEffect(() => {
        axios.get(`${serverRouter}get_questions`)
            .then((response) => {
                setData(response.data.result);
            })
    }, []);

    function showConfirm (id) {
        setId(id);
        setConfirm(1);
    }

    function deleteConfirm(val, id) {
        setConfirm(0);
        if(val == 1) {
            axios.post(`${serverRouter}delete_msg`, {id: data[id].id})
                .then(response => {
                    let temp = data;
                    temp.splice(id, 1);
                    setData(temp);
                    toast.success('Message was deleted successfully.', toastStyle);
                })
        }
    }

    return (
        <div id="myModal" className="modal admin_msg_modal">
            <div className="modal-content">
                <span className="close" onClick={() => close()}>&times;</span>
                <div className="user_msg">
                    {
                        data.length == 0 ?
                            <h2>No Messages.</h2> : 
                            data.map((msg, index) => {
                                return (
                                    <div className="question mt-3">
                                        <div><p>Question Name:</p><span>{msg.name}</span></div>
                                        <div><p>Question:</p><span>{msg.message}</span></div>
                                        <div><p>Answer:</p><span>{msg.answer}</span></div>
                                        <div>
                                            <Button
                                                val="Delete"
                                                cls="button msgDelete"
                                                type="button"
                                                click={() => showConfirm(index)}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                    }
                </div>
            </div>
            {
                confirm == 1 &&
                    <ConfirmModal select='message' id={id} close={(val, id) => deleteConfirm(val, id)} />
            }
        </div>
    );
}

export default MsgModal;