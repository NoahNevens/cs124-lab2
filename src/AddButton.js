import "./AddButton.css";

function AddButton(props) {

    return <>
        <button className="add_button"
                onClick={e => {props.onAddTask("", props.value)}}
                title={"add task"}>
            +
        </button>
    </>
}

export default AddButton;
