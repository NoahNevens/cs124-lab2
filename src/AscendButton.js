import "./AscendButton.css";

function AscendButton(props) {
    return <button className={"ascendButton"} onClick={props.onClick}>
        {props.ascending ? "▲" : "▼"}
    </button>
}

export default AscendButton;