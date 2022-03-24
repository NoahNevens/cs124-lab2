import "./PriorityButton.css";

function PriorityButton(props) {
    return <select className={"priority "+String(props.priority)}
                onChange={props.onChange} value={props.priority}>
        <option value={"high"}>high</option>
        <option value={"med"}>med</option>
        <option value={"low"}>low</option>
    </select>
}

export default PriorityButton;
