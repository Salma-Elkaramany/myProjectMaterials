
import '../../assets/check_user.scss';
import SignIn from './signin';
import SignUp from './signup'
import {useState} from 'react';

const CheckUser = ({checked}) => {
    const [checkPro, setCheckPro] = useState(1);
    
    return (
        <div>
            <p className="check_logo">E<span>ventify</span></p>
            <div className="container check_user">
                <div className="layout box-shadow">
                    {
                        checkPro == 1 ?
                            <SignIn checked={checked} sign_up={() => setCheckPro(2)} /> :
                            <SignUp sign_in={() => setCheckPro(1)} />
                    }
                </div>
            </div>
        </div>
    );
}

export default CheckUser;