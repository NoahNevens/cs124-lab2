import {collection, orderBy, query} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";

function DeletePopup(props) {

    const q = query(collection(props.db, props.mainCollection, props.listid, "tasks"));
    const [tasks, loading, error] = useCollectionData(q);

    function deleteList() {
        props.handleDeleteList(props.listid, tasks);
        props.onDeleteConfirm(false);
    }

    return <>
        <div className="overlay" tabIndex={0}
             onKeyDown={(e) => props.handleEscPopup(e, props.onDeleteConfirm)}>
        </div>
        <div className="popup_box" tabIndex={0}
             onKeyDown={(e) => props.handleEscPopup(e, props.onDeleteConfirm)}>
            <h1 className="popup_header">Delete list?</h1>
            <span id="popup_instructions">
                Are you sure you would like to delete "{props.listname}"?
                This action cannot be undone.</span>
            <button id="xbutton" aria-label="don't delete and close popup"
                    onClick={() => props.onDeleteConfirm(false)}>x</button>
            <button className="popup_enter_button"
                    onClick={() => deleteList()}
                    onKeyDown={e => props.handleEnterPopup(e, deleteList)} >
                Yes, delete.
            </button>
        </div>
    </>
}

export default DeletePopup;