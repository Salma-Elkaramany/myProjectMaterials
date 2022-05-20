
import {useState} from 'react';
import MsgModal from './message/modal';

const Header = ({redirect}) => {

    const [modal, setModal] = useState(0);

    return (
        <>
            <div className="header">
                <div className="ticket">
                    <div className="head">
                        <i className="bi bi-chat-left-text-fill"></i>
                        <p>Messages</p>
                    </div>
                    <div className="body">
                        <p>View Details</p>
                        <a onClick={() => setModal(1)}><i className="bi bi-arrow-right-circle"></i></a>
                    </div>
                </div>
                <div className="ticket">
                    <div className="head">
                        <i className="bi bi-bookmarks"></i>
                        <p>Tickets</p>
                    </div>
                    <div className="body">
                        <p>View Details</p>
                        <a onClick={() => redirect(2)}><i className="bi bi-arrow-right-circle"></i></a>
                    </div>
                </div>
                <div className="ticket">
                    <div className="head">
                        <i className="bi bi-calendar4-event"></i>
                        <p>Events</p>
                    </div>
                    <div className="body">
                        <p>View Details</p>
                        <a onClick={() => redirect(3)}><i className="bi bi-arrow-right-circle"></i></a>
                    </div>
                </div>
            </div>
            {
                modal == 1 && 
                    <MsgModal close={() => setModal(0)}/>
            }
        </>
    );
}

export default Header;