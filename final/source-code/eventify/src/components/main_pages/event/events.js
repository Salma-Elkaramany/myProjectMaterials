
import '../../../assets/event.scss';
import {useState, useEffect} from 'react';
import Event from './event';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './modal';
import axios from 'axios';
import DescModal from './desc_modal';
import serverRouter from '../../../serverRouter';
const Events = () => {

    const [modal, setModal] = useState(0);
    const [desc, setDesc] = useState(-1);
    const [active, setActive] = useState(0);
    const [deleted, setDeleted] = useState();
    var eventIndex = 0;

    const [data, setData] = useState(() => {
        axios.post(`${serverRouter}get_event`, {delete: 0})
            .then(response => {
                setData(response.data.result);
            })
        return [];
    })

    useEffect(() => {
        axios.post(`${serverRouter}get_event`, {delete: 0})
            .then(response => {
                setData(response.data.result);
            })
        
    }, [deleted]);

    function set_active (val) {
        if(val == 0) {
            axios.post(`${serverRouter}get_event`, {delete: 0})
            .then(response => {
                setData(response.data.result);
            })
        } else {
            axios.post(`${serverRouter}get_event`, {delete: 1})
            .then(response => {
                setData(response.data.result);
            })
        }
        setActive(val);
    }

    function set_Modal(val) {
        setModal(0);
        if(val == 1) {
            set_active(active);
        }
    }

    function set_desc(index) {
        setDesc(data[index].description);
    }

    return (
        <div className="event">
            <ToastContainer />
            <div className="total">
                <div className="header">
                    <ul>
                        <li className={active == 0 ? 'active' : ''} onClick={() => set_active(0)}>Active</li>
                        <li className={active == 1 ? "active" : ''} onClick={() => set_active(1)}>Past</li>
                    </ul>
                </div>
                <div className="body">
                    <div className="header mt-3 mb-4">
                        <p>{active == 0 ? 'Active Events' : 'Past Events'}</p>
                    </div>
                    {
                        active == 0 ?
                            <div className="create">
                                <a onClick={() => setModal(1)}><i className="bi bi-plus-circle"></i>Create Event</a>
                            </div> :
                        null
                    }
                   
                    <div className="even mb-4">
                        {
                            data.map((event, index) => {
                                if (event.delet == 0) {
                                    eventIndex ++;
                                    return <Event  event={event} id={eventIndex} index={index} modal={(index) => set_desc(index)} active='0' deleted={(val) => {setDeleted(val)}} /> 
                                } else if(event.delet == 1 || event.delet == 4) {
                                    return <Event  event={event} id={index + 1} index={index} modal={(index) => set_desc(index)} active='1' />;
                                }
                            })
                        }
                        {
                            data.map((event, index) => {
                                if (event.delet == 2) {
                                    eventIndex ++;
                                    return <Event  event={event} id={eventIndex} index={index} modal={(index) => set_desc(index)} active='0' deleted={(val) => {setDeleted(val)}} /> 
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            {
                modal == 1 ? 
                    <Modal close={(val) => set_Modal(val)} /> : null
            }
            {
                desc != -1 ?
                    <DescModal description={desc} close={() => setDesc(-1)} /> : null
            }
        </div>
    );
}

export default Events;