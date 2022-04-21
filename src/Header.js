import './Header.css';

function Header(props) {
    return <h1 className={props.emailVerified? "" : "vm"}>
        <i className="far fa-calendar-check"></i> To-Do
    </h1>;
}

export default Header;