

const Personal = ({data}) => {
    return (
        <>
            <p>Personal details:</p>
            <div className="detail_row mt-3">
                <p>Forename:</p>
                <p>{data.forename}</p>
            </div>
            <div className="detail_row mt-3">
                <p>Surname:</p>
                <p>{data.surname}</p>
            </div>
            <div className="detail_row mt-3">
                <p>Username:</p>
                <p>{data.username}</p>
            </div>
            <div className="detail_row mt-3">
                <p>Email:</p>
                <p>{data.email}</p>
            </div>
            <div className="detail_row mt-3">
                <p>Phone:</p>
                <p>{data.phoneNumber}</p>
            </div>
        </>
    );
}

export default Personal;