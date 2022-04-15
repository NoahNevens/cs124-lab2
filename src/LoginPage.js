import "./LoginPage.css";
import Header from "./Header.js"
import {useState} from "react";
import {
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword,
    useSignInWithGoogle
} from "react-firebase-hooks/auth";
import LoadingScreen from "./LoadingScreen";

function SignInWithGoogle(props) {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(props.auth);

    return <button onClick={() => signInWithGoogle()}
                   className="signin_button">
                Sign In With <i className="fa fa-google" aria-hidden="true" />
    </button>;
}

function SignInWithEmailButton(props) {
    return <button className="signin_button"
                   onClick={() => props.onLogInPage(true)}>
        Sign In With Email
    </button>
}

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
            <input type="text" id='email' className="email_field" value={email}
                   onChange={e=>setEmail(e.target.value)}/>
            <label htmlFor='pw_field'>Password: </label>
            <input type="text" id='pw' className="pw_field" value={pw}
                   onChange={e=>setPw(e.target.value)}/>
            <button className="popup_enter_button"
                    onClick={() => signInWithEmailAndPassword(email, pw)}>
                Sign In
            </button>
        </div>
    </>
}

function SignUp(props) {
    return <button className="signup_button"
                   onClick={() => props.onSignupPage(true)}>
        Sign Up
    </button>
}

function SignUpPopup(props) {
    const [createUserWithEmailAndPassword, userCredential, loading, error] = useCreateUserWithEmailAndPassword(props.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            <label htmlFor='email'>Email: </label>
            <input type="text" id='email' className="email_field" value={email}
                   onChange={e=>setEmail(e.target.value)}/>
            <label htmlFor='pw'>Password: </label>
            <input type="text" id='pw' className="pw_field" value={password}
                   onChange={e=>setPassword(e.target.value)}/>
            <button className="popup_enter_button"
                    onClick={() => createUserWithEmailAndPassword(email, password)}>
                Sign Up
            </button>
        </div>
    </>
}

function LoginPage(props) {
    const [loginPage, setLoginPage] = useState(false);
    const [signupPage, setSignupPage] = useState(false);

    function handleSetLoginPage(bool) {
        setLoginPage(bool);
    }

    function handleSetSignupPage(bool) {
        setSignupPage(bool);
    }

    return <>
        <div className="frontpage">
        <div id="login_header">
            <Header />
        </div>
        <div id="login_logo">
            <i className='fas fa-user-circle'></i>
            <h2>Sign In</h2>
        </div>
        <div id="signin_buttons">
            <SignInWithEmailButton auth={props.auth} onLogInPage={handleSetLoginPage}/>
            <SignInWithGoogle auth={props.auth} />
            <SignUp auth={props.auth} onSignupPage={handleSetSignupPage} />
        </div>
    </div>
        {loginPage && <SignInWithEmailPopUp auth={props.auth} onLogInPage={handleSetLoginPage}/>}
        {signupPage && <SignUpPopup auth={props.auth} onSignupPage={handleSetSignupPage}/>}
    </>

}

export default LoginPage;