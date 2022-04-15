import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {useState} from "react";
import LoadingScreen from "./LoadingScreen";

function SignInWithEmailPopUp(props) {
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(props.auth);

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    if (loading) {
        return <LoadingScreen message="Logging in..." />;
    }

    return <>
        <div className="overlay">
        </div>
        <div className="popup_box">
            <h1 className="popup_header">Sign in</h1>
            <button id="xbutton" onClick={() => props.onLogInPage(false)}>x</button>
            {error && <p className="error_msg">Error logging in: {error.message}</p>}
            <label htmlFor='email_field'>Email: </label>
            <input type="email" id='email' className="email_field" value={email}
                   onChange={e=>setEmail(e.target.value)}/>
            <label htmlFor='pw_field'>Password: </label>
            <input type="password" id='pw' className="pw_field" value={pw}
                   onChange={e=>setPw(e.target.value)}/>
            <button className="popup_enter_button"
                    onClick={() => signInWithEmailAndPassword(email, pw)}>
                Sign In
            </button>
        </div>
    </>
}

export default SignInWithEmailPopUp;