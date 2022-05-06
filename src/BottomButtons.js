import "./BottomButtons.css";

function BottomButtons(props) {


    return <div className={props.emailVerified? "buttons_reg" : "buttons_vm"}>
        <button type="radio"
                className={props.isHideCompleted ? "bottom_button_new" : "bottom_button_reg"}
                id="show_uncomplete"
                onClick={props.onToggleCompletedItems}
                tabIndex={props.popup ? -1 : 0}>
            {props.isHideCompleted ? "Show All" : "Hide Completed"}</button>
        <button type="radio" className="bottom_button_reg" id="clear_complete"
                onClick={props.onClearCompletedItems}
                tabIndex={props.popup ? -1 : 0}>
            Clear Completed</button>
    </div>;
}

export default BottomButtons;