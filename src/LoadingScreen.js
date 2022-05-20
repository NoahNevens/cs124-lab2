import "./LoadingScreen.css";

function LoadingScreen(props) {

    return <div className="loading_screen">
        <div className="loader" />
        <br />
        {props.message}
    </div>

}

export default LoadingScreen;