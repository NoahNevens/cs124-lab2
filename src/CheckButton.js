import "./CheckButton.css";

function CheckButton(props) {
    return <div className={props.isAdd ? "add_round" : "reg_round"}>
        <input type="checkbox" className={props.isAdd ? "add_checkbox" : "reg_checkbox"}
               disabled={props.isAdd}
               readOnly={true}
               checked={props.completed}
               // DOESN'T WORK :(
               // role="checkbox"
               // aria-checked={props.completed}
               // aria-labelledby="checkbox_label"
        />
        <label id="checkbox_label"
               htmlFor="reg_checkbox"
               onClick={e => {props.isAdd ? props.onAddTask("", props.value) :
                   props.onTaskChangeField(props.id, "completed", !props.completed)}}
        />
    </div>
}

export default CheckButton;
