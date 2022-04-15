import './App.css';
import LoadingScreen from "./LoadingScreen.js";
import LoginPage from "./LoginPage.js"
import SignedInApp from "./SignedInApp.js";
import {useAuthState} from "react-firebase-hooks/auth";
import {sendEmailVerification} from "firebase/auth";
import {useMediaQuery} from "react-responsive";

function App(props) {
    const isNarrow = useMediaQuery({maxWidth: 580});
    const [user, loading, error] = useAuthState(props.auth);

    function verifyEmail() {
        sendEmailVerification(user);
    }

    if (loading) {
        return <LoadingScreen message="Loading..." />;
    } else if (user) {
        return <>
            {!user.emailVerified && <div id="verification_msg">
                Note: your email is not yet verified!
                <button type="button" id="verification_button"
                               onClick={verifyEmail}>Send verification.</button>
            </div> }
            <SignedInApp {...props} user={user} auth={props.auth}
                         isNarrow={isNarrow} />
        </>;
    } else {
        return <LoginPage auth={props.auth} />;
    }
}


export default App;