import "./SortButton.css";

function SortButton(props) {
    return <select className={"sort"} onChange={props.onChange} value={props.sortBy}>
        <option value={"value"}>name</option>
        <option value={"priority"}>priority</option>
        <option value={"created"}>date</option>
    </select>
}

export default SortButton;