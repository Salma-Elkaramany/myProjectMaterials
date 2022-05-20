
import '../../../assets/admin/information.scss';

import {useState} from 'react';

import MsgModal from './message_modal/modal';
import EnquiriresModal from './enquiries_modal/modal';
import FagModal from './faq_modal/modal';
import UserModal from './user_modal/modal';
const Information = () => {

    const [modal, setModal] = useState(0);

    return (
        <div className="info">
           <div className="total"> 
                <div className="header">
                    <p>Frequently Asked Questions?</p>
                </div>
                <div className="actions_row mt-5">
                    <div className="ticket">
                        <div className="head">
                            <i className="bi bi-info-circle"></i>
                            <p>Enquiries</p>
                        </div>
                        <div className="body">
                            <p>View Details</p>
                            <a onClick={() => setModal(1)}><i className="bi bi-arrow-right-circle"></i></a>
                        </div>
                    </div>
                    <div className="ticket">
                        <div className="head">
                            <i className="bi bi-stack"></i>
                            <p>Users</p>
                        </div>
                        <div className="body">
                            <p>View Details</p>
                            <a onClick={() => setModal(2)}><i className="bi bi-arrow-right-circle"></i></a>
                        </div>
                    </div>
                </div>
                <div className="actions_row mt-5">
                    <div className="ticket">
                        <div className="head">
                            <i className="bi bi-question-circle"></i>
                            <p>FAQs</p>
                        </div>
                        <div className="body">
                            <p>View Details</p>
                            <a onClick={() => setModal(3)}><i className="bi bi-arrow-right-circle"></i></a>
                        </div>
                    </div>
                    <div className="ticket">
                        <div className="head">
                            <i className="bi bi-chat-left-text-fill"></i>
                            <p>Messages</p>
                        </div>
                        <div className="body">
                            <p>View Details</p>
                            <a onClick={() => setModal(4)}><i className="bi bi-arrow-right-circle"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            {
                modal == 1 ? 
                    <EnquiriresModal close={() => setModal(0)} /> :
                modal == 2 ?
                    <UserModal close={() => setModal(0)} /> :
                modal == 3 ?
                    <FagModal close={() => setModal(0)} /> :
                modal == 4 ?
                    <MsgModal close={() => setModal(0)} /> : null
            }
        </div>
    );
}

export default Information;