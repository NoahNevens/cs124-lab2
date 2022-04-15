import './App.css';
import LoadingScreen from "./LoadingScreen.js";
import LoginPage from "./LoginPage.js"
import SignedInApp from "./SignedInApp.js";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";

function App(props) {
    const [user, loading, error] = useAuthState(props.auth);
    if (loading) {
        return <LoadingScreen message="Loading..." />;
    } else if (user) {
        return <SignedInApp {...props} user={user} auth={props.auth} />;
    } else {
        return <LoginPage auth={props.auth} />;
    }
}


export default App;