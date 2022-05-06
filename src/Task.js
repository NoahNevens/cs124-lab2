import "./Task.css";
import CheckBox from "./CheckBox";
import DueDate from "./DueDate";
import PriorityButton from "./PriorityButton";
import SelectionMaintainingInput from "./SelectionMaintainingInput";

function Task(props) {

    return <div className="task" id={props.id}>
        <CheckBox
            id={props.id} value={props.value}
            isAdd={false}
            completed={props.completed}
            onTaskChangeField={props.onTaskChangeField}
            popup={props.popup}
        />
        <SelectionMaintainingInput
            className={"task_text" + (props.isNarrow ? " tsquished" : "") }
            onChange={
                (e) =>
                    props.onTaskChangeField(props.id, "value", e.target.value)
            }
            onBlur={() => {if (props.value === "") {props.onItemDeleted(props.id)}} }
            value={props.value}
            placeholder={"Add new task"}
            aria-label={props.value}
            popup={props.popup}
        />
        <DueDate
            dueDate={props.dueDate}
            onChange={(e) => props.onTaskChangeField(props.id, "dueDate", e.target.value)}
            isNarrow={props.isNarrow}
            popup={props.popup}
        />
        <PriorityButton priority={props.priority}
                        isNarrow={props.isNarrow}
                        onChange={(e) => props.onTaskChangeField(props.id, "priority", e.target.value)}
                        popup={props.popup}
        />
    </div>;
}

export default Task;