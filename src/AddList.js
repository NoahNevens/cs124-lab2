import "./AddList.js";
import {useState} from "react";

function AddList(props) {
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
        <button onClick={e => {handleSetListBox(true)}}>+</button>
        {newListBox && <input onChange={(e) => setListName(e.target.value)}
                              onKeyPress={handleKeyPress}/>}
    </>
}

export default AddList;