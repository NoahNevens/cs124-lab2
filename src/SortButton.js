import "./SortButton.css";

function SortButton(props) {
    return <>
        <label htmlFor={"sortSelector"} id={"sortLabel"}
               aria-label={"Currently sorted by " + props.sortBy} >
            Sort by:
        </label><br/>
        <select onChange={props.onChange} id={"sortSelector"} value={props.sortBy} >
            <option value={"priority"}>priority</option>
            <option value={"created"}>date added</option>
            <option value={"value"}>alphabetical</option>
            <option value={"dueDate"}>date due</option>
        </select>
    </>
}

export default SortButton;