
import '../../assets/modal.scss';

import Button from '../base_component/button';

const ConfirmModal = ({close, select, id}) => {
    return (
        <div className="modal confirm">
            <div className="modal-content">
                <span className="close" onClick={() => close(0)}>&times;</span>
                {
                    select == 'event' ? 
                        <p>Do you really delete the event?</p> :
                    select == 'answerFaq' ? 
                        <p>Do you really delete the FAQ?</p> :
                        <p>Do you really delete the ticket?</p>
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