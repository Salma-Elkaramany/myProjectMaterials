
import QRCode from "qrcode.react";
import Button from '../base_component/button';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

const QrModal = ({data, close}) => {

    const inputRef = useRef(null);

    function print() {
        html2canvas(inputRef.current).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "JPEG", 10, 30);
            pdf.save("QR.pdf");
        });
    }

    return (
        <div id="myModal" className="modal event">
            <div className="modal-content">
                <span className="close" onClick={() => close()}>&times;</span>
                <div className="qr" ref={inputRef}>
                    <p>Event ID:<span>{data.event_id}</span></p>
                    <p>Event type:<span>{data.type}</span></p>
                    <p>Organiser:<span>{data.organiser}</span></p>
                    <p>Created at:<span>{data.created_at}</span></p>
                    <p>Location:<span>Online</span></p>
                    <p>Scheduled:<span>{data.scheduled_at}</span></p>
                    <p>Description:<span>{data.description}</span></p>
                    <QRCode value={data.qr} className="qrcode" />

                </div>
                <div className="print">
                    <Button
                        val="Print"
                        cls="button print_button"
                        type="button"
                        click={() => print()}
                    />
                </div>
            </div>
        </div>
    );
}

export default QrModal;