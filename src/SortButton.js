import "./DropDown.css";

function SortButton(props) {
    return <>
        <label htmlFor="sortDropDown" className="dropDownLabel" >
            Sort by:
        </label><br/>
        <select onChange={props.onChange} id="sortDropDown"
                className="dropDown" value={props.sortBy} >
            <option value={"priority"} aria-label="sort by priority">priority</option>
            <option value={"created"} aria-label="sort by date added">date added</option>
            <option value={"value"} aria-label="sort alphabetically">alphabetical</option>
            <option value={"dueDate"} aria-label="sort by date due">date due</option>
        </select>
    </>
}

export default SortButton;