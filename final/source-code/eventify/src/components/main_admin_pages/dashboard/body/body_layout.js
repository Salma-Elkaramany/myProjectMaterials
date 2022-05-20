
import Detail from './detail/detail_layout';
import Information from './information';
import {useState, useEffect} from 'react';
import axios from 'axios';
import serverRouter from '../../../../serverRouter';
const Body = () => {

    const [email, setEmail] = useState(sessionStorage.getItem("email"));
    const [update, setUpdate] = useState(0);

    const [data, setData] = useState(()=> {
        
        return {};
    });

    useEffect(() => {
        if(update == 2) { return; }
        axios.post(`${serverRouter}admin/profile_get`, {email})
        .then(res => {
          setData(res.data);
        });
        setUpdate(2);
    }, [update, email]);
      

    function updates () {
        setEmail(sessionStorage.getItem("email"));
        setUpdate(1);
    }

    return (
        <div className="dash_body mt-3">
            <div className="col-md-4 pr-2">
                <div className="detail mt-5">
                    <Detail data={data} />
                </div>
            </div>
            <div className="col-md-8 information">
                <Information updates={() => {updates()}} data={data} />
            </div>
        </div>
    );
}

export default Body;