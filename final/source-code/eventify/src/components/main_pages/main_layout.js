
import '../../assets/main_page.scss';
import Dashboard from './dashboard/dashboard';
import Tickets from './tickets/tickets';
import Events from './event/events';
import Contact from './contact/contact';
import Faqs from './faqs/faqs';
import axios from 'axios';
import {useState, useEffect} from 'react';
import serverRouter from '../../serverRouter';

const MainAdminPage = ({logout}) => {
    const [notificationDropDown, setNotificationDropDown] = useState(false);
    const [menu, setMenu] = useState(1);
    const [time, setTime] = useState(new Date());
    const email = sessionStorage.getItem('email');

    const [data, setData] = useState(() => {
        axios.post(`${serverRouter}profile_get`, {email})
        .then(res => {
          setData(res.data);
        });
        return {};
    });

    const [notifications, setNotifications] = useState(() => {
        axios.post(`${serverRouter}notifications`, {email})
        .then(res => {
            setNotifications(res.data);
        })
        return [];
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            axios.post(`${serverRouter}notifications`, {email})
            .then(res => {
                setNotifications(res.data);
            })
            setTime(new Date());
          }, 30000);
          return () => clearTimeout(timer);
    }, [time])

    function close(index, id) {
        let temp = notifications;
        temp.splice(index, 1);
        setNotifications(temp);
        setTime(new Date());
        axios.post(`${serverRouter}set_notification`, {id})
            .then(res => {})
    }

    return (
        <div className='main_page'>
            <div className="main_page_header">
                <p className="main_logo">E<span>ventify</span></p>
                <div className="main_header_menu">
                    <a><img src={data.image} />{data.username}</a>
                    <a onClick={() => setNotificationDropDown(!notificationDropDown)}>
                        <i className="bi bi-bell"></i>
                        {
                            notifications.length != 0 ? 
                                <span>{notifications.length}</span> : null
                        }
                    </a>
                    {
                        notifications.length != 0 ?
                            <div className={notificationDropDown ? 'notification show' : 'notification'}>
                                <h3>Notifications</h3>
                                <ul>
                                    {
                                        notifications.map((notification, index) => {
                                            return (
                                                <li>
                                                    <div><span>{notification.msg}</span></div>
                                                    <a onClick={() => close(index, notification.id)}>&times;</a>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div> : null
                    }
                </div>
            </div>
            <div className="main_page_body">
                <div className="main_page_menu">
                    <div className="col-md-2">
                        <ul>
                            <li className={menu == 1 ? 'active' : ''} onClick={() => setMenu(1)}><i className="bi bi-house-door" /><p>Dashboard</p></li>
                            <li className={menu == 2 ? 'active' : ''} onClick={() => setMenu(2)}><i className="bi bi-bookmarks" /><p>Tickets</p></li>
                            <li className={menu == 3 ? 'active' : ''} onClick={() => setMenu(3)}><i className="bi bi-calendar4-event" /><p>Event Portal</p></li>
                            <li className={menu == 4 ? 'active' : ''} onClick={() => setMenu(4)}><i className="bi bi-person-lines-fill" /><p>Contact Us</p></li>
                            <li className={menu == 5 ? 'active' : ''} onClick={() => setMenu(5)}><i className="bi bi-question-circle" /><p>FAQs</p></li>
                            <li className={menu == 6 ? 'active' : ''} onClick={() => {logout(0)}}><i className="bi bi-box-arrow-right" /><p>Log out</p></li>
                        </ul>
                    </div>
                    <div className="col-md-10">
                        {
                            menu == 1 ? 
                                <Dashboard redirect={(val) => setMenu(val)} /> : 
                            menu == 2 ? 
                                <Tickets /> :
                            menu == 3 ?
                                <Events /> : 
                            menu == 4 ?
                                <Contact /> :
                            <Faqs /> 
                        }
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default MainAdminPage;