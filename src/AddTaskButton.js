import "./AddTaskButton.css";

function AddTaskButton(props) {

    return <button className="add_button"
                   onClick={e => {props.onAddTask("", props.value)}}
                   aria-label="add new task"
                   title="add task"
                   tabIndex={props.popup ? -1 : 0}>
        +
    </button>;
}

export default AddTaskButton;