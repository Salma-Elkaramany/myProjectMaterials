

import Input from '../../base_component/input';
import Button from '../../base_component/button';
import {useState} from 'react';
import '../../../assets/modal.scss'
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

const Modal = ({close}) => {

    const [ques, setQues] = useState('');

    function submit () {
        axios.post(`${serverRouter}ask_faq`, {question: ques})
            .then((response) => {
                toast.success('Please wait the answer.', toastStyle);
                close();
            })
    }

    return (
        <div className="modal faq">
            <div className="modal-content">
                <span className="close" onClick={() => close()}>&times;</span>
                <div className="faq_row">
                    <p>Question:</p>
                    <Input 
                        val={ques}
                        type="text"
                        name="ques"
                        id="ques"
                        placeholder=""
                        cls="input mt-2"
                        change={(val) => {setQues(val)}}
                    />
                </div>
                <div className="event_qr mt-4">
                    <Button
                        val="Submit"
                        type="button"
                        cls="button modal_submit"
                        click={submit}
                    />
                </div>
            </div>
        </div>
    );
}

export default Modal;