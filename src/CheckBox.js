import "./CheckBox.css";

function CheckBox(props) {
    return <input type="checkbox" className="check_box"
                  aria-label={"task " + (props.completed? "is " : "is not ") + "completed"}
                  checked={props.completed}
                  onClick={e => {props.onTaskChangeField(props.id, "completed",
                      !props.completed)}}
                  title={props.completed ? "uncheck" : "check completed"}
                  tabIndex={props.popup ? -1 : 0}

    />
}


export default CheckBox;