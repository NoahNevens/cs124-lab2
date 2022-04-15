import "./UserBar.css";

function getFirstName(name) {
    return name.split(" ")[0];
}

function UserBar(props) {
    console.log("narrow", props.isNarrow);
    const displayName = props.isNarrow ? getFirstName(props.user.displayName)
                                                        : props.user.displayName ;
    return <div className="userBar">
        Hello, {displayName}.
        <button role={"button"} onClick={props.onClick}
                id="sign_out_button">Sign out.</button>
    </div>;
}

export default UserBar;