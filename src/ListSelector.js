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
                className="dropDown" value={props.currentListId} >
            <option id={"no_list"} value={"noList"}>select list</option>
            {
                props.lists.map(list => <option value={list.id} key={list.id}> {list.name} </option>)
            }
        </select>
        <AddListButton onAddList={props.onAddList}  />
    </>
}

export default ListSelector;