import {useState} from "react";

function SharePopup(props) {
    const [email, setEmail] = useState("");

    function share() {
        props.handleShareList(email);
        props.onSharePage(false);
    }

    const sharedWith = props.list.sharedWith.filter(e => e !== props.user.email);

    return <>
        <div className="overlay">
        </div>
        <div className="popup_box share_popup_box">
            <h1 className="popup_header">Share</h1>
            <span id="popup_instructions">Enter a friend's email below to give read and write access.
                Email must belong to a valid user. <br />
            </span>
            <button id="xbutton" onClick={() => props.onSharePage(false)}>x</button>
            <label htmlFor='email'>Email: </label>
            <input type="text" id='email' className="email_field" value={email}
                   onChange={e=>setEmail(e.target.value)}/>
            <div id="shareText">Currently shared with:</div>
            <div id="sharedEmails">
            {sharedWith.map(sharedEmail =>
                    <button className="sharedEmail"
                            onClick={e => props.handleUnshareList(sharedEmail)}
                            disabled={props.list.owner !== props.user.uid}
                    >
                        {sharedEmail}
                    </button>)
            }
            </div>
            <button className="popup_enter_button" onClick={() => share()}>
                Share
            </button>
        </div>
    </>
}

export default SharePopup;
