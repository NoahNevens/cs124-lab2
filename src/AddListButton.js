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
                className="top_button" >+</button>
        {newListBox && <input id="name_list_field"
                              placeholder="Dan's list"
                              onChange={(e) => setListName(e.target.value)}
                              onKeyPress={handleKeyPress}/>}
    </>
}

export default AddListButton;