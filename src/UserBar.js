import "./UserBar.css";
import "./SettingsPopup.js"
import {useState} from "react";
import SettingsPopup from "./SettingsPopup";

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
                id="settings_button"><i className="fa-solid fa-gear"/></button>
        <button onClick={props.onSignOut}
                id="sign_out_button">Sign out.</button>
    </div>;
}

export default UserBar;