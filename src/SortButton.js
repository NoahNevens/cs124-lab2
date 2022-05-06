import "./DropDown.css";

function SortButton(props) {
    return <>
        <label htmlFor="sortDropDown" className="dropDownLabel" >
            Sort by:
        </label><br/>
        <select onChange={props.onChange} id="sortDropDown"
                className="dropDown" value={props.sortBy} tabIndex={props.popup ? -1 : 0} >
            <option value={"priority"} aria-label="sort by priority" tabIndex={props.popup ? -1 : 0}>priority</option>
            <option value={"created"} aria-label="sort by date added" tabIndex={props.popup ? -1 : 0}>date added</option>
            <option value={"value"} aria-label="sort alphabetically" tabIndex={props.popup ? -1 : 0}>alphabetical</option>
            <option value={"dueDate"} aria-label="sort by date due" tabIndex={props.popup ? -1 : 0}>date due</option>
        </select>
    </>
}

export default SortButton;