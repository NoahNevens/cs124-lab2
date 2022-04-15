import "./UserBar.css";

function getFirstName(name) {
    return name.split(" ")[0];
}

function UserBar(props) {
    console.log(props.user.displayName === null);
    const displayName =
        props.user.displayName !== null ? (props.isNarrow ? getFirstName(props.user.displayName)
                                                        : props.user.displayName)
            : props.user.email;
    return <div className="userBar">
        Hello, {displayName}.
        <button onClick={props.onClick}
                id="sign_out_button">Sign out.</button>
    </div>;
}

export default UserBar;