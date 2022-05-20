
import '../../../../assets/modal.scss';
import axios from 'axios';
import {useState, useEffect} from 'react';
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
const UserModal = ({close}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${serverRouter}admin/get_users`)
            .then((response) => {
                setData(response.data.result);
            })
    }, []);

    

    return (
        <div id="myModal" className="modal admin_msg_modal">
            <ToastContainer />
            <div className="modal-content">
                <span className="close" onClick={() => close()}>&times;</span>
                <div className="questions">
                    {
                        data.length == 0 ?
                            <h2>No Users.</h2> : 
                            data.map((user, index) => {
                                return (
                                    <div className="question mt-3">
                                        <div><p>UserName:</p><span>{user.username}</span></div>
                                        <div><p>Email:</p><span>{user.email}</span></div>
                                    </div>
                                );
                            })
                    }
                </div>
            </div>
            
        </div>
    );
}

export default UserModal;