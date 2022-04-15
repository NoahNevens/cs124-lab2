import {useState} from "react";

function SharePopup(props) {
    const [email, setEmail] = useState("");

    return <>
        <div className="overlay">
        </div>
        <div className="popup_box">
            <h1 className="popup_header">Share list</h1>
            <span id="share_instructions">Enter a friend's email below to give read and write access.
                Email must belong to a valid user. </span>
            <button id="xbutton" onClick={() => props.onSharePage(false)}>x</button>
            <label htmlFor='email'>Email: </label>
            <input type="text" id='email' className="email_field" value={email}
                   onChange={e=>setEmail(e.target.value)}/>
            <button className="popup_enter_button"
                    onClick={() => console.log("share")}>
                Share
            </button>
        </div>
    </>
}

export default SharePopup;