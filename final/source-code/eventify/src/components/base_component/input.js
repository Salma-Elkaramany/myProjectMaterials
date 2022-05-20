

import '../../assets/input.scss';

const Input = ({
    val,
    placeholder,
    type,
    cls,
    change,
    id,
    checked,
    name,
}) => {
    return (
        <>
        {
            type == 'file' ?
                <input 
                    value={val}
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    className={cls}
                    onChange={(event) => {change(event)}
                }
                /> :
            type == 'checkbox' ?
                <input 
                    checked={checked}
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    className={cls}
                    onChange={(event) => {change(event.target.checked)}}
                /> :
                <input 
                    value={val}
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    className={cls}
                    onChange={(event) => {change(event.target.value)}}
                /> 
        }
        </>
    );
}

export default Input;