
import '../../assets/modal.scss';

import Button from '../base_component/button';

const ConfirmModal = ({close, id, select, desc}) => {
    return (
        <div className="modal confirm">
            <div className="modal-content">
                <span className="close" onClick={() => close(0, id)}>&times;</span>
                {
                    select == 'event' ? 
                        <p>Why do you delete the event?</p> :
                    select == 'message' ?
                        <p>Do you really delete message?</p> :
                        <p>Do you really delete the ticket?</p>
                }
                {
                    select == 'event' &&
                        <textarea 
                            onChange={(event) => desc(event.target.value)}
                        />
                }
                <div className="confirm_action mt-3">
                    <Button
                        val="Cancel"
                        cls="button confirm_btn"
                        click={() => close(0, id)}
                    />
                    <Button
                        val="Delete"
                        cls="button confirm_btn"
                        click={() => close(1, id)}
                    />
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;