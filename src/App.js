import './App.css';
import './Popup.css';
import LoadingScreen from "./LoadingScreen.js";
import LoginPage from "./LoginPage.js"
import SignedInApp from "./SignedInApp.js";
import {useAuthState} from "react-firebase-hooks/auth";
import {sendEmailVerification} from "firebase/auth";
import {useMediaQuery} from "react-responsive";

function App(props) {
    const isNarrow = useMediaQuery({maxWidth: 580});
    const isRlyNarrow = useMediaQuery({maxWidth: 400});
    const [user, loading, error] = useAuthState(props.auth);

    function verifyEmail() {
        sendEmailVerification(user);
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    }

    const verificationMsg = isRlyNarrow? <button type="button" id="verification_button"
                                                 aria-label="send verification email"
                                                 onClick={verifyEmail}>
                                    Verify email.</button> :
                                <> Your email is not yet verified!
                                    <button type="button" id="verification_button"
                                            aria-label="send verification email"
                                            onClick={verifyEmail}>
                                    Send verification.</button>
                                </>

    if (loading) {
        return <LoadingScreen message="Loading..." />;
    } else if (user) {
        return <>
            {!user.emailVerified && <div id="verification_msg">
                {verificationMsg}
            </div> }
            <SignedInApp {...props} user={user}
                         isNarrow={isNarrow} />
        </>;
    } else {
        return <LoginPage auth={props.auth} />;
    }
}


export default App;