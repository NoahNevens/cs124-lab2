
import {collection, deleteDoc, doc, query, serverTimestamp, setDoc, updateDoc, where} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useState} from "react";
import LoadingScreen from "./LoadingScreen";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import Header from "./Header";
import ListSelector from "./ListSelector";
import TaskList from "./TaskList";
import "./SignedInApp.css";
import UserBar from "./UserBar.js";
import {signOut} from "firebase/auth";
import SharePopup from "./SharePopup";
import DeletePopup from "./DeletePopup";
import SettingsPopup from "./SettingsPopup";

function SignedInApp(props) {

    const collectionName = "task-lists";
    const qList = query(collection(props.db, collectionName),
        where("sharedWith", "array-contains", props.user.email));
    const [lists, listLoading, listError] = useCollectionData(qList);

    const [currentListId, setCurrentListId] = useState("noList");
    const [currentListName, setCurrentListName] = useState("task-list");

    const [sharePage, setSharePage] = useState(false);
    const [settingsPopup, setSettingsPopup] = useState(false);
    const [deleteConfirmPage, setDeleteConfirmPage] = useState(false);

    if (listLoading) {
        return <LoadingScreen message="Loading..."/>;
    }
    if (listError) {
        console.log(listError);
        return <div>Error! Uh oh</div>;
    }

    const currentList = lists.filter(l => l.id === currentListId)[0];

    function handleAddList(listName) {
        const newId = generateUniqueID();
        setDoc(doc(props.db, collectionName, newId),
            {id: newId,
                name: listName,
                created: serverTimestamp(),
                owner: props.user.uid,
                sharedWith: [props.user.email]  // list is default shared with owner
            });
        setCurrentListId(newId);
        setCurrentListName(listName);
    }

    function handleDeleteList(listId) {
        //ran out of time to do delete tasks
        //use forEach on the current list to delete all tasks in list
        deleteDoc(doc(props.db, collectionName, listId));
        setCurrentListId("noList");
        setCurrentListName("task-list");
    }

    function handleSetList(listId) {
        setCurrentListId(listId);
    }

    function handleShareList(friendEmail) {
        updateDoc(doc(props.db, collectionName, currentListId),
            {sharedWith: currentList.sharedWith.concat([friendEmail])})
        console.log('shared')
        // ARRAY UNION INSTEAD OF CONCAT
    }

    function handleUnshareList(friendEmail) {
        updateDoc(doc(props.db, collectionName, currentListId),
            {sharedWith: currentList.sharedWith.filter(email => email !== friendEmail) })
        console.log('unshared eeee')
    }

    function handleSetSharePage(bool) {
        setSharePage(bool);
    }

    function handleSetDeleteConfirmPage(bool) {
        setDeleteConfirmPage(bool);
    }

    function handleSetSettingsPopup(bool) {
        setSettingsPopup(bool);
    }

    return <div className="SignedInApp">
        <div id="content">
            <UserBar user={props.user} isNarrow={props.isNarrow}
                     auth={props.auth}
                     setSettingsPopup={handleSetSettingsPopup}
                     onSignOut={() => signOut(props.auth)} />
            <Header emailVerified={props.user.emailVerified} />
            <div id="list_top_buttons">
                <ListSelector lists={lists}
                              currentListId={currentListId}
                              currentListName={currentListName}
                              onChange={(e) => {handleSetList(e.target.value)}}
                              onAddList={handleAddList} />
                <button className="top_button"
                        title="share list"
                        aria-label="share list"
                        disabled={currentListId==="noList"}
                        onClick={() => handleSetSharePage(true)}>
                    <i className="fa-solid fa-user-group" />
                </button>
                <button className="top_button"
                        title="delete list"
                        aria-label="delete current list"
                        disabled={currentListId==="noList"}
                        onClick={(e) => {handleSetDeleteConfirmPage(true)}} >
                    <i className="fa-solid fa-trash-can" />
                </button>
            </div>
            {currentListId !== "noList" && <TaskList db={props.db}
                                                     mainCollection={collectionName}
                                                     subId={currentListId}
                                                     subName={currentListName}
                                                     lists={lists}
                                                     isNarrow={props.isNarrow}
                                                     emailVerified={props.user.emailVerified} />}
        </div>
        {sharePage && <SharePopup onSharePage={handleSetSharePage} handleShareList={handleShareList}
                                  handleUnshareList={handleUnshareList}
                                  user={props.user} list={currentList}/>}
        {deleteConfirmPage && <DeletePopup onDeleteConfirm={handleSetDeleteConfirmPage}
                                           listname={currentListName}
                                           listid={currentListId}
                                           handleDeleteList={handleDeleteList}/>}
        {settingsPopup && <SettingsPopup auth={props.auth} onSettingsPopup={handleSetSettingsPopup} />}
    </div>;
}

export default SignedInApp;
