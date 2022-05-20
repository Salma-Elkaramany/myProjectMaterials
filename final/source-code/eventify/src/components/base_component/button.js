
import '../../assets/button.scss';

const Button = ({
    click,
    cls,
    val,
    type,
}) => {
    return (
        <button type={type} onClick={click} className={cls}>
            {val}
        </button>
    );
}

export default Button;