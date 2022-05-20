
import '../../../assets/faqs.scss';

import Faq from './faq';
import {useState, useEffect} from 'react';
import Modal from './modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import serverRouter from '../../../serverRouter';
const Faqs = () => {

    const [que, setQue] = useState(0);
    const email = sessionStorage.getItem('email');

    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        axios.post(`${serverRouter}get_question`, {email: email})
        .then(response => {
            setFaqs(response.data.faqs);
        })
    }, [])
    
    return (
        <div className="faqs">
            <ToastContainer />
            
           <div className="total"> 
                <div className="header">
                    <p>Frequently Asked Questions?</p>
                </div>
                <div className="body">
                    {
                        faqs.map(faq => {
                            return <Faq data={{name: faq.question, answer: faq.answer}} />
                        })
                    }
                </div>
                <a onClick={() => setQue(1)}><i className="bi bi-question-circle"></i></a>
            </div> 
            {
                que == 1 ?
                    <Modal close={() => setQue(0)} /> : null
            }
        </div>
    );
}

export default Faqs;