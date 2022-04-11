import "./ListSelector.css";
import AddList from "./AddList.js";

function ListSelector(props) {
    return <>
        <label htmlFor={"listSelector"} id={"listSelectorLabel"}
               aria-label={"Currently list is" + props.currentList} >
            Select List:
        </label><br/>
        <select onChange={props.onChange} id={"listSelector"} value={props.currentList} >
            {
                props.lists.map(list => <option value={list.name}> {list.name} </option>)
            }
        </select>
        <AddList onAddList={props.onAddList} />
    </>
}

export default ListSelector;