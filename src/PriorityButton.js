import "./PriorityButton.css";

function PriorityButton(props) {
    return <>
        <select id={"prioritySelector"}
                className={"priority "+ props.priority}
                onChange={props.onChange} value={props.priority} >
            <option value={"high"} aria-label={"high priority"}>high</option>
            <option value={"med"} aria-label={"medium priority"}>med</option>
            <option value={"low"} aria-label={"low priority"}>low</option>
        </select>
    </>


}

export default PriorityButton;
