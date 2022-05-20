
import '../../../assets/admin/dashboard.scss';

import Header from './header';
import Body from './body/body_layout';

const Dashboard = ({redirect}) => {
    return (
        <>
            <Header redirect={(val) => {redirect(val)}} />
            <Body />
        </>
    );
}

export default Dashboard;