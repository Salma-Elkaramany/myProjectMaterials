
import '../../../assets/dashboard.scss';

import Header from './header';
import Body from './body/body_layout';
import { ToastContainer, toast } from 'react-toastify';
const Dashboard = ({redirect}) => {
    return (
        <>
            <ToastContainer />
            <Header redirect={(val) => {redirect(val)}} />
            <Body />
        </>
    );
}

export default Dashboard;