import "./CheckBox.css";

function CheckBox(props) {
    return <input type="checkbox" className="check_box"
               checked={props.completed}
               onClick={e => {props.onTaskChangeField(props.id, "completed",
                                                            !props.completed)}}
                  title={props.completed ? "uncheck" : "check completed"}

        />
}


export default CheckBox;
