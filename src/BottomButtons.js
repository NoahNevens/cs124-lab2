import "./BottomButtons.css";
import {useState} from "react";

function BottomButtons(props) {
    // const [showOnlyUncomplete, setShowOnlyUncomplete] = useState(false);

    return <div className="buttons">
        <button type="radio" className="bottom_button" id="show_uncomplete"
                onClick={props.onToggleCompletedItems}
                onMouseOver={props.onMouseOver}
                onMouseOut={props.onMouseOut} >
            {props.isShowOnlyUncomplete ? "Show All" : "Show Only Uncomplete"}</button>
        <button type="radio" className="bottom_button" id="clear_complete"
                onClick={props.onClearCompletedItems} >
            Clear All Completed</button>
    </div>;
}

export default BottomButtons;