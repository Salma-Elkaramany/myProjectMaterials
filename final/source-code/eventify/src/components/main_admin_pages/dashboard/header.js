
import axios from 'axios';
import {useState} from 'react';
import serverRouter from '../../../serverRouter';

const Header = ({redirect}) => {

    const [data, setData] = useState(() => {
        axios.get(`${serverRouter}admin/get_event_admin`)
            .then(response => {
                setData({events: response.data.events, admins: response.data.admins});
            })
        return {};
    });

    return (
        <>
            <div className="msg_header">
                <div className="ticket">
                    <div className="head">
                        <p>{data.events}</p>
                        <p><i className="bi bi-calendar-check"></i></p>
                    </div>
                    <p>Active Events</p>
                </div>
                <div className="ticket">
                    <div className="head">
                        <p>{data.admins}</p>
                        <p><i className="bi bi-shield-fill-exclamation"></i></p>
                    </div>
                    <p>Current Admins</p>
                </div>
            </div>
        </>
    );
}

export default Header;