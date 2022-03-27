import "./CheckButton.css";

function CheckButton(props) {
    const cName = props.isAdd ? "add_box" : "reg_box"

    return <div className={props.isAdd ? "add_button" : "check_button"}
                role="checkbox"
                // aria-checked={props.completed}
                // aria-label={"test1"}
                // aria-labelledby="checkbox_label"
        >
        <input type="checkbox" className={cName}
               disabled={props.isAdd}
               readOnly={true}
               checked={props.completed}
               // role="checkbox"
               // aria-checked={props.completed}
               // aria-label={"test2"}
        />
        <label id="checkbox_label" htmlFor={cName}
               onClick={e => {props.isAdd ? props.onAddTask("", props.value) :
                   props.onTaskChangeField(props.id, "completed", !props.completed)}}
               // role="checkbox"
               // aria-checked={props.completed}
               // aria-label={"test3"}
        />
    </div>
}

export default CheckButton;
