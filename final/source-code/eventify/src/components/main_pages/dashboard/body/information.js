
import Input from '../../../base_component/input';
import Button from '../../../base_component/button';
import {useState, useEffect} from 'react';
import axios from 'axios';

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

const Information = ({data, updates}) => {
    const [forname, setForname] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    useEffect(() => {
        if(data){
            setUsername(data.username ? data.username : '');
            setEmail(data.email ? data.email : '');
            setPhone(data.phoneNumber ? data.phoneNumber : '');
            setForname(data.forename ? data.forename : '');
            setSurname(data.surname ? data.surname : '');
        }
    }, [data]);

    function update () {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(email && confirmEmail) {
            if(!email || regex.test(email) === false || !confirmEmail || regex.test(confirmEmail) ===false || email != confirmEmail) {
                toast.warning('Email was wrong.', toastStyle);
                return;
            }
        }
    
        if((!email && confirmEmail) || (email && !confirmEmail)) {
            toast.warning('Email was wrong.', toastStyle);
            return;
        }

        if(currentPass) {
            if(newPass != confirmPass || !newPass || !confirmPass) {
                toast.warning('Password confirm was wrong.', toastStyle);
                return;
            }
        }        
        const currentEmail = sessionStorage.getItem('email');
        const currentId = sessionStorage.getItem('id');
        axios.post(`${serverRouter}profile_set`, {currentId, forname, surname, username, currentEmail , email, phone, currentPass, newPass})
            .then((res) => {
                if(res.data == 'password') {
                    toast.warning('Current password was wrong.', toastStyle);
                } else if (res.data == 'email') {
                    toast.error('Email is already exists.', toastStyle);
                } else {
                    sessionStorage.setItem('email', !email ? confirmEmail : email);
                    updates(); 
                    toast.success('Update successfully.', toastStyle);
                }     
            })
    }

    return (
        <>
            <p>Change Information</p>
            <form>
                <div className="general">
                    <h4>General settings:</h4>
                    <div className="info mt-3">
                        <p>Forename:</p>
                        <Input 
                            val={forname}
                            type="text"
                            name="forname"
                            id="forname"
                            placeholder=""
                            cls="check_input input"
                            change={(val) => {setForname(val)}}
                        />
                    </div>
                    <div className="info mt-3">
                        <p>Surname:</p>
                        <Input 
                            val={surname}
                            type="text"
                            name="surname"
                            id="surname"
                            placeholder=""
                            cls="check_input input"
                            change={(val) => {setSurname(val)}}
                        />
                    </div>
                    <div className="info mt-3">
                        <p>Username:</p>
                        <Input 
                            val={username}
                            type="text"
                            name="username"
                            id="username"
                            placeholder=""
                            cls="check_input input"
                            change={(val) => {setUsername(val)}}
                        />
                    </div>
                    <div className="info mt-3">
                        <p>Email:</p>
                        <Input 
                            val={email}
                            type="email"
                            name="email"
                            id="email"
                            placeholder=""
                            cls="check_input input"
                            change={(val) => {setEmail(val)}}
                        />
                    </div>
                    <div className="info mt-3">
                        <p>Confirm email:</p>
                        <Input 
                            val={confirmEmail}
                            type="email"
                            name="confirmEmail"
                            id="confirmEmail"
                            placeholder=""
                            cls="check_input input"
                            change={(val) => {setConfirmEmail(val)}}
                        />
                    </div>
                    <div className="info mt-3">
                        <p>phone:</p>
                        <Input 
                            val={phone}
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder=""
                            cls="check_input input"
                            change={(val) => {setPhone(val)}}
                        />
                    </div>
                </div>
                <div className="password">
                    <h4>Password settings:</h4>
                    <div className="info mt-3">
                        <p>Current password:</p>
                        <Input 
                            val={currentPass}
                            type="password"
                            name="currentPass"
                            id="currentPass"
                            placeholder=""
                            cls="check_input input"
                            change={(val) => {setCurrentPass(val)}}
                        />
                    </div>
                    <div className="info mt-3">
                        <p>New Password:</p>
                        <Input 
                            val={newPass}
                            type="password"
                            name="newPass"
                            id="newPass"
                            placeholder=""
                            cls="check_input input"
                            change={(val) => {setNewPass(val)}}
                        />
                    </div>
                    <div className="info mt-3">
                        <p>Confirm New Password:</p>
                        <Input 
                            val={confirmPass}
                            type="password"
                            name="confirmPass"
                            id="confirmPass"
                            placeholder=""
                            cls="check_input input"
                            change={(val) => {setConfirmPass(val)}}
                        />
                    </div>
                </div>
                <div className="center mt-3">
                    <Button
                        val="UPDATE"
                        cls="button info_update"
                        type = "button"
                        click={update}
                    />
                </div>
            </form>
        </>
    );
}

export default Information;