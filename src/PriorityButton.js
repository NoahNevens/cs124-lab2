import "./PriorityButton.css";

function PriorityButton(props) {
    const cName = "priority "+ props.priority +
                    (props.isNarrow ? " psquished" : "");
    return <>
        <select id={"prioritySelector"}
                className={cName}
                onChange={props.onChange} value={props.priority} >
            <option value={"a"}>{props.isNarrow ? "H" : "high"}</option>
            <option value={"b"}>{props.isNarrow ? "M" : "med"}</option>
            <option value={"c"}>{props.isNarrow ? "L" : "low"}</option>
        </select>
    </>


}

export default PriorityButton;