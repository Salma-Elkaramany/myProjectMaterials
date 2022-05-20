
import '../../../assets/admin/event.scss';
import {useState, useEffect} from 'react';
import Event from './event';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Input from '../../base_component/input';
import serverRouter from '../../../serverRouter';
const ViewEvents = ({close}) => {

    
    const [active, setActive] = useState(0);
    const [id, setId] = useState('');

    const [data, setData] = useState(() => {
        axios.get(`${serverRouter}admin/get_event_all`)
            .then(response => {
                setData(response.data.result);
            })
        return [];
    })

    return (
        <div id="myModal" className="modal event">
            <div className="modal-content view_event">
                <span className="close" onClick={() => close(0)}>&times;</span>
                <div className="header">
                    <p>Modify Event</p>
                </div>
                {
                    active == 3 && 
                    <div className="modify">
                        <p>Event ID:</p>
                        <Input 
                            val={id}
                            type="number"
                            name="type"
                            id="type"
                            placeholder=""
                            cls="input mt-2"
                            change={(val) => {setId(val)}}
                        />
                        
                    </div>
                }
                <div className="even">
                    <div className="total_even">
                        <div className="header">
                            <ul>
                                <li className={active == 0 ? 'active' : ''} onClick={() => setActive(0)}>Active Event</li>
                                <li className={active == 1 ? "active" : ''} onClick={() => setActive(1)}>Past Event</li>
                                <li className={active == 2 ? "active" : ''} onClick={() => setActive(2)}>Deleted Event</li>
                                <li className={active == 3 ? "active" : ''} onClick={() => setActive(3)}>By Event Id</li>
                            </ul>
                        </div>
                        <div className="body">                  
                            <div className="even mb-4">
                                {
                                    data.map(event => {
                                        if(active == 0) {
                                            if(event.delet == 0) {
                                                return <Event event={event} />
                                            }
                                        } else if (active == 1) {
                                            if(event.delet == 4) {
                                                return <Event event={event} />
                                            }
                                        } else if (active == 2) {
                                            if(event.delet == 1) {
                                                return <Event event={event} />
                                            }
                                        } else {
                                            if(event.id == id) {
                                                return <Event event={event} />
                                            }
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default ViewEvents;