import "./AscendButton.css";

function AscendButton(props) {
    return <button onClick={props.onClick}>
        {props.ascending ? "▲" : "▼"}
    </button>
}

export default AscendButton;