
import {useState} from 'react';
import Input from '../base_component/input';
import Button from '../base_component/button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import serverRouter from '../../serverRouter';
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

const SignUp = ({sign_in}) => {
    const [userName, setUserName] = useState(''); 
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [phoneNumber, setPhoneNumber] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [pass, setPass] = useState(''); 
    const [confirmPass, setConfirmPass] = useState(''); 


    function enter_guest () {

    }

    function sign_up () {

        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!email || regex.test(email) === false){
            toast.warning('Email is not valid.', toastStyle);
            return;
        }

        if(!pass || pass !== confirmPass) {
            toast.warning('Password was wrong.', toastStyle);
            return;
        }

        axios.post(`${serverRouter}admin/check_signup`, {userName, firstName, lastName, phoneNumber, email, pass})
            .then((response) => {
                if(response.data.result === 'success') {
                    toast.success('Sign up successfully. Please sign in', toastStyle);
                } else {
                    toast.error('Email is already exists.', toastStyle);
                }
            })
    }

    return(
        <>
            <ToastContainer />
            <div className="col-md-5 pr-2">
                <div className="box-shadow signup_login">
                    <h3>Welcome Back!</h3>
                    <p>Already have an account?</p>
                    <div className="mt-5">
                        <Button
                            val="SIGN IN"
                            cls="button checked"
                            click={sign_in}
                        />
                    </div>
                </div>
            </div>
            <div className="col-md-7 box-shadow signup_signup">
                <form action="#" method="post">

                    <h3>Create Account</h3>
                    <div>
                        <Button
                            val="Or enter as a guest?"
                            cls="button enter_guest"
                            click={enter_guest}
                        />
                    </div>
                    <Input 
                        val={userName}
                        id="userName"
                        name="userName"
                        type="text"
                        placeholder="Username*"
                        cls="check_input input mt-4"
                        change={(userName) => {setUserName(userName)}}
                    />
                    <Input 
                        val={firstName}
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="First Name*"
                        cls="check_input input mt-4"
                        change={(firstName) => {setFirstName(firstName)}}
                    />
                    <Input 
                        val={lastName}
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Last Name*"
                        cls="check_input input mt-4"
                        change={(lastName) => {setLastName(lastName)}}
                    />
                    <Input 
                        val={phoneNumber}
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        placeholder="Mobile Number"
                        cls="check_input input mt-4"
                        change={(phoneNumber) => {setPhoneNumber(phoneNumber)}}
                    />
                    <Input 
                        val={email}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email Address*"
                        cls="check_input input mt-4"
                        change={(email) => {setEmail(email)}}
                    />
                    <Input 
                        val={pass}
                        id="pass"
                        name="pass"
                        type="password"
                        placeholder="Password*"
                        cls="check_input input mt-4"
                        change={(pass) => {setPass(pass)}}
                    />
                    <Input 
                        val={confirmPass}
                        type="password"
                        placeholder="Confirm Password*"
                        cls="check_input input mt-4"
                        change={(confirmPass) => {setConfirmPass(confirmPass)}}
                    />
                    <div className="mt-4">
                        <Button
                            val="SIGN UP"
                            type="button"
                            cls="button checked"
                            click={sign_up}
                        />
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignUp;