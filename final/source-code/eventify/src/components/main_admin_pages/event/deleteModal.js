

import '../../../assets/modal.scss';

import Input from '../../base_component/input';
import {useState, useEffect} from 'react';
import Button from '../../base_component/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import serverRouter from '../../../serverRouter';
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

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DeleteModal = ({close}) => {

    const [id, setId] = useState('');
    const [desc, setDesc] = useState('');
    const email = sessionStorage.getItem('email');

    

    function submit() {

        if(!id) {
            toast.error('Please write deleted id.', toastStyle);
            return;
        }

        const data = {id, desc, email: email};
        axios.post(`${serverRouter}admin/delete_event`, data)
            .then(response => {
                if(response.data.result == 'success') {
                    toast.success('Event was created successfully.', toastStyle);
                    close(1);
                } else {
                    if(response.data.result == 'error') {
                        toast.error('Event is not exists.', toastStyle);
                    } else {
                        toast.error('Event was already deleted.', toastStyle);
                    }
                    close(1);
                }
            })
       
    }

    return (
        <div id="myModal" className="modal event">
            <div className="modal-content admin_event">
                <span className="close" onClick={() => close(0)}>&times;</span>
                <div className="header">
                    <p>Delete Event</p>
                </div>
                <div className="event_row">
                    <p>Event ID:</p>
                    <Input 
                        val={id}
                        type="number"
                        name="type"
                        id="type"
                        placeholder=""
                        cls="input mt-2"
                        change={(val) => {setId(val)}}
                    />
                </div>
                <div className="event_row mt-5">
                    <p>Reason of deletion:</p>
                    <textarea onChange={(event) => {setDesc(event.target.value)}} value={desc}></textarea>
                </div>
                <div className="event_qr mt-4">
                    {
                        <Button
                            val="Confirm"
                            type="button"
                            cls="button modal_submit"
                            click={submit}
                        /> 
                    }
                </div>
            </div>
        </div>
    );
}  

export default DeleteModal;