

import '../../../assets/modal.scss';

import Input from '../../base_component/input';
import {useState, useEffect} from 'react';
import Button from '../../base_component/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
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

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const getMonths = {
    'Jan' : 0, 
    'Feb' : 1, 
    'Mar' : 2, 
    'Apr' : 3, 
    'May' : 4, 
    'Jun' : 5, 
    'Jul' : 6, 
    'Aug' : 7, 
    'Sep' : 8, 
    'Oct' : 9, 
    'Nov' : 10, 
    'Dec' : 11
  };


const ModifyModal = ({close}) => {

    const [id, setId] = useState('');
    const [type, setType] = useState('');
    const [organiser, setOrganiser] = useState('');
    const [period, setPeriod] = useState('');
    const [date, setDate] = useState();
    const [scheduled, setScheduled] = useState('');
    const [qr, setQr] = useState(null);
    const [desc, setDesc] = useState('');
    const [searchData, setSearchData] = useState({});

    const [data, setData] = useState(() => {

        axios.post(`${serverRouter}get_event`, {delete: 0})
            .then(response => {
                setData(response.data.result);
            })

        return [];
    });

    function search() {
        var temp = 0;
        
        data.map(event => {
            if(event.id == id) {
                temp = 1;
                setSearchData(event);
                setType(event.type);
                setOrganiser(event.organiser);
                setPeriod(event.period);
                setDate(event.created_at);
                setScheduled(event.scheduled_at);
                setQr(event.qr);
                setDesc(event.description);
                return;
            }
        })

        if(temp == 0) {
            setSearchData({});
            setType('');
            setOrganiser('');
            setPeriod('');
            setDate('');
            setScheduled('');
            setQr('');
            setDesc('');
        }
    }

    function submit() {

        if(period.toString().includes('-')) {
            toast.error(`Period mustn't be nagative.`, toastStyle);
            return;
        }

        const month =  getMonths[date.split(',')[0].split(' ')[0]];
        const day = parseInt(date.split(',')[0].split(' ')[1]);
        const year = parseInt(date.split(',')[1].split(' ')[1]);
        const hour = parseInt(date.split(',')[1].split(' ')[2].split(':')[0]);
        const minute = parseInt(date.split(',')[1].split(' ')[2].split(':')[1]);

        const someDay = new Date();

        someDay.setFullYear(year, month, day);
        someDay.setHours(hour);
        someDay.setMinutes(minute);

        const d = new Date();

        d.setMinutes(someDay.getMinutes() + (parseFloat(period) * 60));
        let temp = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${d.getHours() < 10 ? '0' + d.getHours() : d.getHours()}:${d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()}`;
        setQr(`${type}${organiser}${period}${date}${scheduled}`);

        const data = {type, organiser, qr, date, scheduled: temp, desc, period, id};

        axios.post(`${serverRouter}admin/update_event`, data)
            .then(response => {
                if(response.data.result == 'success') {
                    toast.success('Event was updated successfully.', toastStyle);
                    close(1);
                }
            })
    }

    return (
        <div id="myModal" className="modal event">
            <div className="modal-content admin_event">
                <span className="close" onClick={() => close(0)}>&times;</span>
                <div className="header">
                    <p>Modify Event</p>
                </div>
                <div className="event_row">
                    <p>Event ID:</p>
                    <div className="modify">
                        <Input 
                            val={id}
                            type="number"
                            name="type"
                            id="type"
                            placeholder=""
                            cls="input mt-2"
                            change={(val) => {setId(val)}}
                        />
                        <Button
                            val="Search"
                            type="button"
                            cls="button modal_submit"
                            click={search}
                        />
                    </div>
                     
                </div>
                
                {
                    searchData.id && 
                        <div className="mt-5">
                            <div className="event_row">
                                <p>Event type:</p>
                                <Input 
                                    val={type}
                                    type="text"
                                    name="type"
                                    id="type"
                                    placeholder=""
                                    cls="input mt-2"
                                    change={(val) => {setType(val)}}
                                />
                            </div>
                            <div className="event_row">
                                <p>Event organiser:</p>
                                <Input 
                                    val={organiser}
                                    type="text"
                                    name="type"
                                    id="type"
                                    placeholder=""
                                    cls="input mt-2"
                                    change={(val) => {setOrganiser(val)}}
                                />
                            </div>
                            <div className="event_row">
                                <p>Event created:</p>
                                <Input 
                                    val={date}
                                    type="text"
                                    name="type"
                                    id="type"
                                    placeholder=""
                                    cls="input mt-2"
                                />
                            </div>
                            <div className="event_row">
                                <p>Event scheduled:</p>
                                <Input 
                                    val={scheduled}
                                    type="text"
                                    name="type"
                                    id="type"
                                    placeholder=""
                                    cls="input mt-2"
                                />
                            </div>
                            <div className="event_row mt-2">
                                <p>Description:</p>
                                <textarea onChange={(event) => {setDesc(event.target.value)}} value={desc}></textarea>
                            </div>
                            <div className="event_row">
                                <p>Period:</p>
                                <Input 
                                    val={period}
                                    type="text"
                                    name="type"
                                    id="type"
                                    placeholder=""
                                    cls="input mt-2"
                                    change={(val) => {setPeriod(val)}}
                                />
                            </div>
                        </div>
                }

                <div className="event_qr mt-4">
                    {
                        <Button
                            val="Confirm"
                            type="button"
                            cls="button modal_submit"
                            click={submit}
                        /> 
                    }
                </div>
            </div>
        </div>
    );
}  

export default ModifyModal;