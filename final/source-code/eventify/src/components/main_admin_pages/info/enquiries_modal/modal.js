
import '../../../../assets/modal.scss';
import axios from 'axios';
import {useState, useEffect} from 'react';
import AnswerModal from './answer_modal';
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
const EnquiriresModal = ({close}) => {

    const [data, setData] = useState([]);

    const [id, setId] = useState(0);
    const [showAnswer, setShowAnswer] = useState(0);
    const [time, setTime] = useState(new Date);
    useEffect(() => {
            axios.get(`${serverRouter}admin/get_questions`)
            .then((response) => {
                setData(response.data.result);
            })
    }, []);

    function reply (val, id) {
        setShowAnswer(0);
        if(val == 1) {
            setData(data.splice(id, 1));
            setTime(new Date);
        }
    }

    function showModal (id) {
        setId(id);
        setShowAnswer(1);
    }

    return (
        <div id="myModal" className="modal admin_msg_modal">
            <ToastContainer />
            <div className="modal-content">
                <span className="close" onClick={() => close()}>&times;</span>
                <div className="questions">
                    {
                        data.length == 0 ?
                            <h2>No Questions.</h2> : 
                                data.map((question, index) => {
                                    return (
                                        <div className="question mt-3">
                                            <div><p>User:</p><span>{question.email}</span></div>
                                            <div><p>Question Name:</p><span>{question.name}</span></div>
                                            <div className="action">
                                                <Button
                                                    val="Answer"
                                                    cls="button delete"
                                                    type="button"
                                                    click={() => showModal(index)}
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                    }
                </div>
                {
                    showAnswer == 1 &&
                        <AnswerModal id={data[id].id} desc={data[id].message} close={(val, id) => reply(val, id)} />
                }
            </div>
            
        </div>
    );
}

export default EnquiriresModal;