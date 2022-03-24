import "./BottomButtons.css";

function BottomButtons(props) {

    return <div className="buttons">
        <button type="radio"
                className={props.isHideCompleted ? "bottom_button_new" : "bottom_button_reg"}
                id="show_uncomplete"
                onClick={props.onToggleCompletedItems}
                onMouseOver={props.onMouseOver}
                onMouseOut={props.onMouseOut} >
            {props.isHideCompleted ? "Show All" : "Hide Completed"}</button>
        <button type="radio" className="bottom_button_reg" id="clear_complete"
                onClick={props.onClearCompletedItems} >
            Clear Completed</button>
    </div>;
}

export default BottomButtons;