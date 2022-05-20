

import '../../../assets/contact.scss';
import Input from '../../base_component/input';
import Button from '../../base_component/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {useState} from 'react';
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

const Contact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [enquiry, setEnquiry] = useState('');
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState(() => {
        axios.get(`${serverRouter}admin/get_role_user`)
            .then((response) => {
                setUsers(response.data.result);
            })
        return [];
    });

    function contact () {

        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(!name || !email || !message || regex.test(email) === false) {
            toast.error('Data is not full.', toastStyle);
            return;
        }

        axios.post(`${serverRouter}ask_question`, {name, email, enquiry, message})
            .then(response => {
                toast.success('Please wait the answer.', toastStyle);
            })
    }

    return (
        <div className="contact">
            <ToastContainer />
            <div className="total">
                <div className="header">
                    <p className="mt-1">Contact Us</p>
                    <p>Have some questions? Or Need help?</p>
                </div>
                <div className="body">
                    <div className="text mt-3">
                        <p>Name</p>
                        <Input 
                            val={name} 
                            id="name"
                            name="name"
                            type="text"
                            placeholder=""
                            cls="default input"
                            change={(name) => {setName(name)}}
                        />
                    </div>
                    <div className="text mt-3">
                        <p>Email (associated with account)</p>
                        <Input 
                            val={email} 
                            id="email"
                            name="email"
                            type="email"
                            placeholder=""
                            cls="default input"
                            change={(email) => {setEmail(email)}}
                        />
                    </div>
                    <div className="text mt-3">
                        <p>Enquiry</p>
                        <select name="pets" onChange={(event) => {setEnquiry(event.target.value)}}>
                            <option value=""></option>
                            {
                                users.map(user => {
                                    if(user.action == 1) {
                                        return <option value={user.user}>{user.user}</option>
                                    }
                                })
                            }
                        </select>
                    </div>
                    <div className="text mt-3">
                        <p>Message</p>
                        <textarea onChange={(event) => {setMessage(event.target.value)}}></textarea>
                    </div>
                </div>
                <Button 
                    val="Submit"
                    cls="button button_contact"
                    type="button"
                    click={() => contact()}
                />
            </div>
        </div>
    );
}

export default Contact;