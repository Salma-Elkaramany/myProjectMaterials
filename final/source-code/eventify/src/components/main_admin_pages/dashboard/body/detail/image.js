
import Input from '../../../../base_component/input';
import {useState} from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import serverRouter from '../../../../../serverRouter';

const toastStyle = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    color: true,
}

const Image = ({data}) => {

    const [image, setImage] = useState('');

    function imageUpload(event) {
        let file = event.target.files[0];
        let fileName = event.target.files[0].name;
        let reader = new FileReader();
        let email = sessionStorage.getItem('email');

        reader.onload = function (r) {
            setImage(r.target.result);
        }
        reader.readAsDataURL(file);



        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("email", email);
        formData.append("path", __dirname);

        
        axios.post(`${serverRouter}admin/upload`, formData)
            .then((response) => {
                if(response.data.result == 'success')
                    toast.success('Image uploaded successfully.', toastStyle);
            });
    }
    
    return (
        <>
            <div className="edit_image">
                <img src={image ? image : data.image} />
                <span className="mt-3">
                    Edit Photo
                    <Input 
                        type="file"
                        name="image"
                        id="image"
                        cls="input image"
                        change={(event) => {imageUpload(event)}}
                    />
                </span>
                
            </div>
            <p>{data.username}</p>
        </>
    );
}

export default Image;