import "./AscendButton.css";

function AscendButton(props) {
    const sortStr = "Currently sorting in " + (props.ascending ? "ascending" : "descending") + " order. " +
                    "Click to switch to " + (props.ascending ? "descending" : "ascending") + " order.";

    return <button className="ascendButton" onClick={props.onClick}
                   title={"switch to " + (props.ascending ? "descending" : "ascending")}
                   aria-label={sortStr} >
        {props.ascending ? "▼" : "▲"}
    </button>
}

export default AscendButton;