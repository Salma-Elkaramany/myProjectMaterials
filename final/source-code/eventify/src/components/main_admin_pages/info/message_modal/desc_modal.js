

const DescModal = ({description, close}) => {
    return (
        <div id="myModal" className="modal event">
            <div className="modal-content">
                <span className="close" onClick={() => close()}>&times;</span>
                <div className="desc">
                    <h1>Description</h1>
                    <span className="mt-5">{description}</span>
                </div>
            </div>
        </div>
    );
}

export default DescModal;