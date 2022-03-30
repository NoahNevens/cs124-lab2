import "./AddButton.css";

function AddButton(props) {

    return <>
        <button className="add_button"
                onClick={e => {props.onAddTask("", props.value)}}>
            +
        </button>
    </>
}

export default AddButton;
