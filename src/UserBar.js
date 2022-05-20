import "./UserBar.css";
import "./SettingsPopup.js"

function getFirstName(name) {
    return name.split(" ")[0];
}

function UserBar(props) {

    const displayName =
        props.user.displayName !== null ? (props.isNarrow ? getFirstName(props.user.displayName)
                                                        : props.user.displayName)
            : props.user.email;
    return <div className="userBar">
        Hello, {displayName}.
        <button onClick={() => props.setSettingsPopup(true)}
                aria-label="open settings"
                id="settings_button"
                tabIndex={props.popup ? -1 : 0}><i className="fa-solid fa-gear"/></button>
        <button onClick={props.onSignOut}
                aria-label="sign out"
                id="sign_out_button"
                tabIndex={props.popup ? -1 : 0}>Sign out.</button>
    </div>;
}

export default UserBar;