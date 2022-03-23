import "./Task.css";
import CheckButton from "./CheckButton";
import PriorityButton from "./PriorityButton";

function Task(props) {

    return <div>
        <div className="task" id={props.id}>
            <CheckButton
                id={props.id} value={props.value}
                isAdd={false}
                completed={props.completed}
                onTaskChangeField={props.onTaskChangeField}
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
            />
            <PriorityButton
                priority={props.priority}
                onChange={(e) => props.onTaskChangeField(props.id, "priority", e.target.value)}
            />
        </div>
    </div>;
}

export default Task;