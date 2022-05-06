import "./PriorityButton.css";

function PriorityButton(props) {
    const cName = "priority "+ props.priority +
                    (props.isNarrow ? " psquished" : "");
    return <>
        <select id={"prioritySelector"}
                className={cName}
                onChange={props.onChange} value={props.priority} tabIndex={props.popup ? -1 : 0}>
            <option value={"a"} aria-label={"high priority"} tabIndex={props.popup ? -1 : 0}>{props.isNarrow ? "H" : "high"}</option>
            <option value={"b"} aria-label={"medium priority"} tabIndex={props.popup ? -1 : 0}>{props.isNarrow ? "M" : "med"}</option>
            <option value={"c"} aria-label={"low priority"} tabIndex={props.popup ? -1 : 0}>{props.isNarrow ? "L" : "low"}</option>
        </select>
    </>


}

export default PriorityButton;