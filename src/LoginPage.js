import "./LoginPage.css";
import Header from "./Header.js"
import {useState} from "react";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import SignUpPopup from "./SignUpPopup.js"
import SignInWithEmailPopUp from "./SignInWithEmailPopup";
import LoadingScreen from "./LoadingScreen";

function SignInWithGoogle(props) {
    const [signInWithGoogle, _, loading, error] = useSignInWithGoogle(props.auth);

    if (loading) {
        return <LoadingScreen message="Loading..." />;
    } else if (error) {
        console.log(error)
        return <div>Error!</div>
    } else {
        return <button onClick={() => signInWithGoogle()}
                       aria-label="sign in with Google"
                       className="signin_button">
                    Sign In With <i className="fa fa-google" aria-hidden="true" />
        </button>;
    }
}

function SignInWithEmailButton(props) {
    return <button className="signin_button"
                   onClick={() => props.onLogInPage(true)}>
        Sign In With Email
    </button>
}

function SignUp(props) {
    return <button className="signup_button"
                   onClick={() => props.onSignupPage(true)}>
        Sign Up
    </button>
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