import '../../../../assets/modal.scss';
import axios from 'axios';
import {useState, useEffect} from 'react';
import AnswerModal from './answer_modal';
import Button from '../../../base_component/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from '../../confirm_modal';

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
const FagModal = ({close}) => {

    const [data, setData] = useState([]);

    const [id, setId] = useState(0);
    const [showAnswer, setShowAnswer] = useState(0);
    const [time, setTime] = useState(new Date());
    const [confirm,  setConfirm] = useState(0);

    useEffect(() => {
        console.log(time);
            axios.get(`${serverRouter}admin/get_faqs`)
                .then((response) => {
                    setData(response.data.result);
                })
    }, [time]);

    function reply (val, id) {
        setShowAnswer(0);
        setTime(new Date());
    }

    function showModal (id) {
        setId(id);
        setShowAnswer(1);
    }

    function showConfirm (id) {
        setId(id);
        setConfirm(1);
    }

    function deleteConfirm(val, id) {
        setConfirm(0);
        if(val == 1) {
            const faqid = data[id].id;
            axios.post(`${serverRouter}admin/delete_faq`, {id: faqid})
                .then((response) => {
                    var temp = data;
                    temp.splice(id, 1);
                    setData(temp);
                    setTime(new Date);
                    toast.success('Faq was deleted successfully.', toastStyle);
                })
        }
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
                                        <div><p>Question:</p><span>{question.question}</span></div>
                                        <div className="action">
                                            <Button
                                                val="Answer"
                                                cls="button answer_faq"
                                                type="button"
                                                click={() => showModal(index)}
                                            />
                                            <Button
                                                val="Delete"
                                                cls="button delete"
                                                type="button"
                                                click={() => showConfirm(index)}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                    }
                </div>
                {
                    showAnswer == 1 &&
                        <AnswerModal id={data[id].id} data={data[id]} close={(val, id) => reply(val, id)} />
                }
                {
                    confirm == 1 && 
                        <ConfirmModal id={id} select='answerFaq' close={(val, id) => deleteConfirm(val, id)} />
                }
            </div>
            
        </div>
    );
}

export default FagModal;