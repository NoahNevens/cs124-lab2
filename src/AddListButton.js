import "./AddListButton.css";
import {useState} from "react";

function AddListButton(props) {
    const [newListBox, setNewListBox] = useState(false);
    const [listName, setListName] = useState("");

    function handleSetListBox(bool) {
        setNewListBox(bool);
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            props.onAddList(listName);
            setNewListBox(false);
        }
    }
    return <>
        <button onClick={e => {handleSetListBox(true)}}
                aria-label="add new list"
                title="add list"
                className="top_button" ><i className="fa-solid fa-plus"/></button>
        {newListBox && <input id="name_list_field"
                              placeholder="Dan's list"
                              aria-label="new list name: "
                              onChange={(e) => setListName(e.target.value)}
                              onKeyPress={handleKeyPress}/>}
    </>
}

export default AddListButton;