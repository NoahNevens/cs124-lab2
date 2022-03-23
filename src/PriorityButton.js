import "./PriorityButton.css";

function PriorityButton(props) {
    return <select className={"priority "+String(props.priority)}
                onChange={props.onChange}>
        <option value={"high"} selected={props.priority === "high"}>high</option>
        <option value={"med"} selected={props.priority === "med"}>med</option>
        <option value={"low"} selected={props.priority === "low"}>low</option>
    </select>
}

export default PriorityButton;
