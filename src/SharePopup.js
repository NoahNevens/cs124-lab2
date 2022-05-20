import {useState} from "react";

function SharePopup(props) {
    const [email, setEmail] = useState("");
    const sharedWith = props.list.sharedWith.filter(e => e !== props.user.email);
    const isOwner = props.list.owner === props.user.uid;

    function share() {
        props.handleShareList(email, props.list.id);
        setEmail("");
    }

    console.log(sharedWith);

    return <>
        <div className="overlay" tabIndex={0}
             onKeyDown={(e) => props.handleEscPopup(e, props.onSharePage)}>
        </div>
        <div className="popup_box share_popup_box" tabIndex={0}
             onKeyDown={(e) => props.handleEscPopup(e, props.onSharePage)}>
            <h1 className="popup_header">Share</h1>
            <span id="popup_instructions">Enter a friend's email below to give read and write access.
                Email must belong to a valid user. <br />
            </span>
            <button id="xbutton" aria-label="close share popup"
                    onClick={() => props.onSharePage(false)}>x</button>
            <label htmlFor='email'>Email: </label>
            <input type="text" id='email' className="email_field" value={email}
                   aria-label="enter email to share with"
                   onChange={e=>setEmail(e.target.value)}
                    // ignore tab and shift tab keys
                   onKeyDown={e => {props.handleEnterPopup(e, share)}}
            />
            {(sharedWith.length === 0) ? <div id="shareText">Not currently shared with anyone</div>
                : <div id="shareText">Currently shared with:</div>}
            <div id="sharedEmails">
                {sharedWith.map(sharedEmail =>
                        <button className="sharedEmail"
                                onClick={e => props.handleUnshareList(sharedEmail, props.list.id)}
                                disabled={!isOwner}
                                aria-label={"unshare with " + sharedEmail} >
                            {sharedEmail}
                        </button>)
                }
                {!isOwner && <button className="sharedEmail"
                        onClick={e => props.handleUnshareList(props.user.email, props.list.id)}
                        aria-label={"unshare with yourself"} > me </button>}
            </div>
            <button className="popup_enter_button" onClick={() => share()}>
                Share
            </button>
        </div>
    </>
}

export default SharePopup;
