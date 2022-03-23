import "./SortButton.css";

function SortButton(props) {
    return <select className={"sort"} onChange={props.onChange}>Sort by
        <option value={"name"}>name</option>
        <option value={"priority"}>priority</option>
        <option value={"date"}>date</option>
    </select>
}

export default SortButton;