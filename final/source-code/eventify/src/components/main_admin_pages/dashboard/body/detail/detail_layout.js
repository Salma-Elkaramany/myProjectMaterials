
import Image from './image';
import Personal from './personal';

const Detail = ({data}) => {
    return (
        <>
            <div className="detail_image">
                <div className="body">
                    <Image data={data} />
                </div>
            </div>
            <div className="detail_information">
                <div className="body mt-3">
                    <Personal data={data} />
                </div>
            </div>
        </>
    );
}

export default Detail;