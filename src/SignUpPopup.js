import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import {useState} from "react";
import {updateProfile} from "firebase/auth";
import LoadingScreen from "./LoadingScreen";

function SignUpPopup(props) {
    const [createUserWithEmailAndPassword, userCredential, loading, error] = useCreateUserWithEmailAndPassword(props.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");

    if (userCredential) {
        return <div>Signed In Already!</div>
    } else if (loading) {
        return <LoadingScreen message="Signing up..." />
    }

    return <>
        <div className="overlay">
        </div>
        <div className="popup_box">
            <h1 className="popup_header">Sign Up</h1>
            <button id="xbutton" onClick={() => props.onSignupPage(false)}>x</button>
            {error && <p className="error_msg">Error signing up: {error.message}</p>}
            <label htmlFor='disp_name'>Name: </label>
            <input type="text" id='disp_name' className="name_field" value={displayName}
                   onChange={e=>setDisplayName(e.target.value)}/>
            <label htmlFor='email'>Email: </label>
            <input type="email" id='email' className="email_field" value={email}
                   onChange={e=>setEmail(e.target.value)}/>
            <label htmlFor='pw'>Password: </label>
            <input type="password" id='pw' className="pw_field" value={password}
                   onChange={e=>setPassword(e.target.value)}/>
            <button className="popup_enter_button"
                    onClick={() => createUserWithEmailAndPassword(email, password).then((res) => {
                        updateProfile(props.auth.currentUser, {
                            displayName: displayName })
                    })
            }>
                Sign Up
            </button>
        </div>
    </>;
}

export default SignUpPopup;