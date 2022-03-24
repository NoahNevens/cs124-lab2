import "./PriorityButton.css";

function PriorityButton(props) {
    return <>
        <select id={"prioritySelector"}
                className={"priority "+String(props.priority)}
                onChange={props.onChange} value={props.priority}>
            <option value={"a"}>high</option>
            <option value={"b"}>med</option>
            <option value={"c"}>low</option>
        </select>
    </>


}

export default PriorityButton;
