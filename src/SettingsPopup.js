import {useState} from "react";
import {sendEmailVerification, updateEmail, updatePassword, updateProfile} from "firebase/auth";

function SettingsPopup(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");

    function update(user) {
        if (user.displayName !== displayName && user.displayName !== "") {
            updateProfile(user, { displayName: displayName });
        }
        if (user.password !== password) {
            updatePassword(user, password);
        }
        if (user.email !== email) {
            updateEmail(user, email);
            sendEmailVerification(user);
        }
        props.onSettingsPopup(false);
    }

    return <>
        <div className="overlay" tabIndex={0}
             onKeyDown={(e) => props.handleEscPopup(e, props.onSettingsPopup)}>
        </div>
        <div className="popup_box" tabIndex={0}
             onKeyDown={(e) => props.handleEscPopup(e, props.onSettingsPopup)}>
            <h1 className="popup_header">Settings</h1>
            <button id="xbutton" aria-label="close settings popup"
                    onClick={() => props.onSettingsPopup(false)}>x</button>
            <label htmlFor='disp_name'>New name: </label>
            <input type="text" id='disp_name' className="name_field" value={displayName}
                   onChange={e=>setDisplayName(e.target.value)}/>
            <label htmlFor='email'>New email: </label>
            <input type="email" id='email' className="email_field" value={email}
                   onChange={e=>setEmail(e.target.value)}/>
            <label htmlFor='pw'>New password: </label>
            <input type="password" id='pw' className="pw_field" value={password}
                   onChange={e=>setPassword(e.target.value)}/>
            <button className="popup_enter_button"
                    onClick={() => update(props.auth.currentUser)}
                    onKeyDown={e => props.handleEnterPopup(e, update(props.auth.currentUser))} >
                Apply Changes
            </button>
        </div>
    </>;
}

export default SettingsPopup;