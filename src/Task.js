import "./Task.css";
import CheckBox from "./CheckBox";
import DueDate from "./DueDate";
import PriorityButton from "./PriorityButton";

function Task(props) {

    return <div>
        <div className="task" id={props.id}>
            <CheckBox
                id={props.id} value={props.value}
                isAdd={false}
                completed={props.completed}
                onTaskChangeField={props.onTaskChangeField}
                // role="checkbox"
                // aria-checked={props.completed}
                // aria-label={"test4"}
            />
            <input
                type="text"
                className="task_text"
                onChange={
                    (e) =>
                        props.onTaskChangeField(props.id, "value", e.target.value)
                }
                onBlur={() => {if (props.value === "") {props.onItemDeleted(props.id)}} }
                value={props.value}
                placeholder={"Add new task"}
                aria-label={props.value}
            />
            <DueDate
                dueDate={props.dueDate}
                onChange={(e) => props.onTaskChangeField(props.id, "dueDate", e.target.value)}
            />
            <PriorityButton priority={props.priority}
                onChange={(e) => props.onTaskChangeField(props.id, "priority", e.target.value)}
            />
        </div>
    </div>;
}

export default Task;