import "./LoginPage.css";
import Header from "./Header.js"
import {useState} from "react";
import {
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword,
    useSignInWithGoogle
} from "react-firebase-hooks/auth";

function SignInWithGoogle(props) {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(props.auth);

    return <button onClick={() => signInWithGoogle()}
                   className="login_button">
                Sign In With <i className="fa fa-google" aria-hidden="true" />
    </button>;
}

function SignInWithEmail(props) {
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(props.auth);

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    if (loading) {
        return <p>Logging in...</p>
    }

    return <button className="login_button"
                   onClick={() => props.onLogInPage(true)}>
        Sign In With Email
    </button>
}

function SignInWithEmailPopUp(props) {
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(props.auth);

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    if (loading) {
        return <p>Logging in...</p>
    }

    return <>
        <div className="overlay">
        </div>
        <div className="signInContainer">
            <div id="signInBox">
                <h1 id="enterCreds">Enter Credentials</h1>
                {error && <p>"Error logging in: " {error.message}</p>}
                <label htmlFor='email'>email: </label>
                <input type="text" id='email' value={email}
                       onChange={e=>setEmail(e.target.value)}/>
                <br/>
                <label htmlFor='pw'>pw: </label>
                <input type="text" id='pw' value={pw}
                       onChange={e=>setPw(e.target.value)}/>
                <br/>
                <button className="signin_button"
                        onClick={() => signInWithEmailAndPassword(email, pw)}>
                    Sign In
                </button>
            </div>
        </div>
        </>
}

function SignUp(props) {
    const [createUserWithEmailAndPassword, userCredential, loading, error] = useCreateUserWithEmailAndPassword(props.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (userCredential) {
        return <div>Signed In Already!</div>
    } else if (loading) {
        return <p>Signing Up...</p>
    }

    return <div>
        {error && <p>"Error signing up: " {error.message}</p>}
        <label htmlFor='email'>Email: </label>
        <input type="text" id='email' value={email}
               onChange={e=>setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='pw'>Password: </label>
        <input type="text" id='pw' value={password}
               onChange={e=>setPassword(e.target.value)}/>
        <br/>
        <button onClick={() =>
            createUserWithEmailAndPassword(email, password)}>
            Sign Up
        </button>
    </div>
}

function LoginPage(props) {
    const [loginPage, setLoginPage] = useState(false);

    function handleSetLoginPage(bool) {
        setLoginPage(bool);
        console.log(loginPage);
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
        <div id="login_buttons">
            <SignInWithEmail auth={props.auth} onLogInPage={handleSetLoginPage}/>
            <SignInWithGoogle auth={props.auth} />
            <SignUp auth={props.auth} />
        </div>
    </div>
        {loginPage && <SignInWithEmailPopUp auth={props.auth} onLogInPage={handleSetLoginPage}/>}
    </>

}

export default LoginPage;