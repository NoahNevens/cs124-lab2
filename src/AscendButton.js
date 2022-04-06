import "./AscendButton.css";
import "./TopButton.css";

function AscendButton(props) {
    const sortStr = "Currently sorting in " + (props.ascending ? "ascending" : "descending") + " order. " +
                    "Click to switch to " + (props.ascending ? "descending" : "ascending") + " order.";

    return <button className="top_button ascend_button" onClick={props.onClick}
                   title={"switch to " + (props.ascending ? "descending" : "ascending")}
                   aria-label={sortStr} >
        {props.ascending ? "▼" : "▲"}
    </button>
}

export default AscendButton;