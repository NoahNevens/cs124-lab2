import "./LoginPage.css";
import Header from "./Header.js"
import {useState} from "react";
import {useSignInWithEmailAndPassword, useSignInWithGoogle} from "react-firebase-hooks/auth";

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
    // *** NEED TO DO EMAIL AND PASSWORD
    // reference this? https://github.com/nrhodes-hmc/cs124sp22-exercises/blob/20-authentication-solution/src/App.js

    return <button className="login_button">
        Sign In With Email
    </button>
}

function LoginPage(props) {
    return <div className="frontpage">
        <div id="login_header">
            <Header />
        </div>
        <div id="login_logo">
            <i className='fas fa-user-circle'></i>
            <h2>Sign In</h2>
        </div>
        <div id="login_buttons">
            <SignInWithEmail auth={props.auth} />
            <SignInWithGoogle auth={props.auth} />
        </div>
    </div>

}

export default LoginPage;