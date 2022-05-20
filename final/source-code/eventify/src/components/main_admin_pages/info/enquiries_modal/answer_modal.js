
import axios from 'axios';
import Input from '../../../base_component/input';
import Button from '../../../base_component/button';
import {useState} from 'react';
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
const AnswerModal = ({id, close, desc}) => {
    const [answer, setAnswer] = useState('');

    function confirm () {
        let data = {answer, id};
        axios.post(`${serverRouter}admin/answer_question`, data)
            .then(response => {
                toast.success('Reply was successfully.', toastStyle);
            })
        close(1, id);
    }

    return (
        <div id="myModal" className="modal event">
            <div className="modal-content">
                <span className="close" onClick={() => close(0, id)}>&times;</span>
                <div className="enquiry">
                    <h1>Reply</h1>
                    <div>
                        <p>Question:</p>
                        <p>{desc}</p>
                    </div>
                    <div>
                        <p>Answer:</p>
                        <textarea onChange={(event) => setAnswer(event.target.value)} value={answer} />
                    </div>
                    <div className="confirm">
                        <Button
                            val="Confirm"
                            cls="button delete"
                            type="button"
                            click={() => confirm()}
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default AnswerModal;