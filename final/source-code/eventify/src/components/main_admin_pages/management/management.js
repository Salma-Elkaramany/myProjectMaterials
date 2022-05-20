

import '../../../assets/admin/management.scss';

import Input from '../../base_component/input';
import Button from '../../base_component/button';
import axios from 'axios';
import {useState, useEffect} from 'react';
import QrModal from '../qr_modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const Management = () => {
    
    const [department , setDepartment] = useState('');
    const [role, setRole] = useState('');
    const [userEnquiry, setUserEnquiry] = useState('');
    const [removeEnquiry, setRemoveEnquiry] = useState('');
    const [permissions, setPermissions] = useState('');
    const [deleted, setDeleted] = useState(false);
    const [modify, setModify] = useState(false);
    const [updateTime, setUpdateTime] = useState(new Date());


    const [data, setData] = useState([]);

    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const getRoleUser = async () => {
            const roleUser = await axios.get(`${serverRouter}admin/get_role_user`);
            setData(roleUser.data.result)
        }

        const getAdmins = async () => {
            const admins = await axios.get(`${serverRouter}admin/get_admins`);
            setAdmins(admins.data.result)
        }
        getRoleUser();
        getAdmins();

    }, [updateTime])

    async function update() {
        const data = {department, role, userEnquiry, removeEnquiry, permissions, deleted, modify};
        let getData = await axios.post(`${serverRouter}admin/management_insert_role`, data);
        if(getData.data.result == 'role') {
            toast.error('Role is already exists.', toastStyle);
            return;
        }

        getData =  await axios.post(`${serverRouter}admin/management_insert_user`, data);
        if(getData.data.result == 'user') {
            toast.error('User enquiry is already exists.', toastStyle);
            return;
        }

        await axios.post(`${serverRouter}admin/management_delete_role`, data);
        
        await axios.post(`${serverRouter}admin/management_delete_user`, data);
        
        await axios.post(`${serverRouter}admin/management_set_permission`, data);

        toast.success('Update was successfully.', toastStyle);

        setUpdateTime(new Date());
        setDepartment('');
        setRole('');
        setUserEnquiry('');
        setRemoveEnquiry('');
        setPermissions('');
        setDeleted(false);
        setModify(false);
        document.getElementById('removeRole').selectedIndex = 0;
        document.getElementById('removeUser').selectedIndex = 0;
        document.getElementById('setPermission').selectedIndex = 0;
    }

    function set_Permissions(val) {
        setPermissions(val);
        if(val == 0) {
            setDeleted(false);
            setModify(false);
        }
        admins.map(admin => {
            if(admin.email == val) {
                setDeleted(admin.can_d == 1 ? true : false);
                setModify(admin.can_m == 1 ? true : false);
            }
        })
    }

    return (
        <div className="management">
            <ToastContainer />
            
           <div className="total"> 
                <div className="header">
                    <p>Manage Website Settings</p>
                </div>
                <div className="body">
                    <div className="property">
                        <p>Add department roles</p>
                        <div>
                            <Input 
                                val={department}
                                type="text"
                                name="department"
                                id="department"
                                placeholder=""
                                cls="check_input input"
                                change={(val) => {setDepartment(val)}}
                            />
                        </div>
                    </div>
                    <div className="property mt-3">
                        <p>Remove department roles</p>
                        <div>
                            <select  id="removeRole" onChange={(event) => {setRole(event.target.value)}}>
                                <option value=""></option>
                                {
                                    data.map((role) => {
                                        if(role.action == 0) {
                                            return <option value={role.role}>{role.role}</option>
                                        }
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="property mt-5">
                        <p>Add user enquiry</p>
                        <div>
                            <Input 
                                val={userEnquiry}
                                type="text"
                                name="userEnquiry"
                                id="userEnquiry"
                                placeholder=""
                                cls="check_input input"
                                change={(val) => {setUserEnquiry(val)}}
                            />
                        </div>
                    </div>
                    <div className="property mt-3">
                        <p>Remove user enquiry</p>
                        <div>
                            <select id="removeUser" onChange={(event) => {setRemoveEnquiry(event.target.value)}}>
                                <option value=""></option>
                                {
                                    data.map((user) => {
                                        if(user.action == 1) {
                                            return <option value={user.user}>{user.user}</option>
                                        }
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="property mt-5">
                        <p>Modify permissions</p>
                        <div>
                            <select id="setPermission" onChange={(event) => {set_Permissions(event.target.value)}}>
                                <option value=""></option>
                                {
                                    admins.map((admin) => {
                                        if(sessionStorage.getItem("email") != admin.email) {
                                            return <option value={admin.email}>{admin.email}</option>
                                        }
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="actions">
                        <Input 
                            val={deleted}
                            type="checkbox"
                            name="deleted"
                            id="deleted"
                            placeholder=""
                            cls="check input"
                            checked={deleted}
                            change={(val) => {setDeleted(val)}}
                        />
                        <span>Can delete</span>
                        <Input 
                            val={modify}
                            type="checkbox"
                            name="modify"
                            id="modify"
                            placeholder=""
                            cls="check input"
                            checked={modify}
                            change={(val) => {setModify(val)}}
                        />
                        <span>Can modify</span>
                    </div>
                </div>
                <Button
                    val="update"
                    cls="button update mt-5"
                    type="button"
                    click={() => update()}
                />
            </div> 
            
        </div>
    );
}


export default Management;