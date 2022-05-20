
import Input from '../base_component/input';
import Button from '../base_component/button';
import {useState, useEffect} from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const SingIn = ({sign_up, checked}) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function sign_in (){
        
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!email || regex.test(email) === false){
            toast.warning('Email is not valid', toastStyle);
            return;
        }
        axios.post(`${serverRouter}admin/check_login`, {email, password})
            .then((response) => {
                if(response.data.result == 'success'){
                    sessionStorage.setItem("id", response.data.id);
                    sessionStorage.setItem("email", email);
                    checked(1);
                } else {
                    toast.error('Email or password is wrong', toastStyle);
                }
            })
    }

    useEffect(() => {
        const listener = event => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            console.log("Enter key was pressed. Run your function.");
            event.preventDefault();
            sign_in();
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, [email, password]);


    function forgot_password () {
        
    }

    return (
        <>
            <ToastContainer />
            <div className="col-md-7 pr-2">
                <form action="#" method="post">
                    <div className="box-shadow login_login">
                        <h3>Sign in to the website</h3>
                        <Input 
                            val={email}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email Address"
                            cls="check_input input mt-4"
                            change={(email) => {setEmail(email)}}
                        />
                        <Input 
                            val={password} 
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            cls="check_input input mt-5"
                            change={(password) => {setPassword(password)}}
                        />
                        <div className="mt-3">
                            <Button
                                type="button"
                                val="Forgot your password?"
                                cls="button forget_password"
                                click={forgot_password}
                            />
                        </div>
                        <div className="mt-4">
                            <Button
                                val="SIGN IN"
                                type="button"
                                cls="button checked"
                                click={sign_in}
                            />
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-md-5 box-shadow login_signup">
                <h3>Hello there!</h3>
                <p>New here? Enter your details and start your journey with us.</p>
                <div className="mt-4">
                    <Button
                        val="SIGN UP"
                        cls="button checked"
                        click={sign_up}
                    />
                </div>
            </div>
        </>
    );
}

export default SingIn;