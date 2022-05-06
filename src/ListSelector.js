import "./DropDown.css";
import "./ListSelector.css";
import AddListButton from "./AddListButton.js";

function ListSelector(props) {
    return <>
        <label htmlFor={"listSelector"} id={"listSelectorLabel"}
               className="dropDownLabel"
               >
            Select List:
        </label><br/>
        <select onChange={props.onChange} id={"listSelector"}
                className="dropDown" value={props.currentListId} tabIndex={props.popup ? -1 : 0} >
            <option id={"no_list"} value={"noList"} tabIndex={props.popup ? -1 : 0}>select list</option>
            {
                props.lists.map(list => <option value={list.id} key={list.id} tabIndex={props.popup ? -1 : 0}> {list.name} </option>)
            }
        </select>
        <AddListButton onAddList={props.onAddList} popup={props.popup} />
    </>
}

export default ListSelector;