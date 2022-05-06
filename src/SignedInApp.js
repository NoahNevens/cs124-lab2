
import {collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where} from "firebase/firestore";
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
    const [isPopup, setIsPopup] = useState(false);

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
            }).then(() => {
            setCurrentListId(newId);
            setCurrentListName(listName);
        });
    }

    function handleDeleteList(listId, tasks) {
        for (const task of tasks) {
            deleteDoc(doc(props.db, collectionName, listId, "tasks", task.id));
        }
        deleteDoc(doc(props.db, collectionName, listId));
        setCurrentListId("noList");
        setCurrentListName("task-list");
    }

    function handleSetList(listId) {
        setCurrentListId(listId);
        if (listId === "noList") {
            setCurrentListName("task-list");
        } else {
            const listName = lists.filter(l => l.id === listId)[0].name;
            setCurrentListName(listName);
        }
    }

    function handleShareList(friendEmail, listId) {
        const list = lists.filter(l => l.id === listId)[0];
        const newSharedWith = Array.from(new Set([...list.sharedWith, ...[friendEmail]]));
        updateDoc(doc(props.db, collectionName, listId),
            {sharedWith: newSharedWith})
    }

    function handleUnshareList(friendEmail, listId) {
        const list = lists.filter(l => l.id === listId)[0];
        updateDoc(doc(props.db, collectionName, listId),
            {sharedWith: list.sharedWith.filter(email => email !== friendEmail) })
        console.log('unshared')
        if (props.user.email === friendEmail) {
            setCurrentListId("noList");
            setCurrentListName("task-list");
            handleSetSharePage(false);
        }
    }

    function handleSetSharePage(bool) {
        setSharePage(bool);
        setIsPopup(bool);
    }

    function handleSetDeleteConfirmPage(bool) {
        setDeleteConfirmPage(bool);
        setIsPopup(bool);
    }

    function handleSetSettingsPopup(bool) {
        setSettingsPopup(bool);
        setIsPopup(bool);
    }

    return <div className="SignedInApp">
        <div id="content">
            <UserBar user={props.user} isNarrow={props.isNarrow}
                     auth={props.auth}
                     setSettingsPopup={handleSetSettingsPopup}
                     onSignOut={() => signOut(props.auth)}
                     popup={isPopup}
            />
            <Header emailVerified={props.user.emailVerified} />
            <div id="list_top_buttons">
                <ListSelector lists={lists}
                              currentListId={currentListId}
                              currentListName={currentListName}
                              onChange={(e) => {handleSetList(e.target.value)}}
                              onAddList={handleAddList}
                              popup={isPopup}
                />
                <button className="top_button"
                        title="share list"
                        aria-label="share list"
                        disabled={currentListId==="noList"}
                        onClick={() => handleSetSharePage(true)}
                        tabIndex={isPopup ? -1 : 0}>
                    <i className="fa-solid fa-user-group" />
                </button>
                <button className="top_button"
                        title="delete list"
                        aria-label="delete current list"
                        disabled={ (currentListId==="noList") || (currentList && (currentList.owner !== props.user.uid)) } // THIS BREAKS
                        onClick={(e) => {handleSetDeleteConfirmPage(true)}}
                        tabIndex={isPopup ? -1 : 0}>
                    <i className="fa-solid fa-trash-can" />
                </button>
            </div>
            {currentListId !== "noList" && <TaskList db={props.db}
                                                     mainCollection={collectionName}
                                                     subId={currentListId}
                                                     subName={currentListName}
                                                     lists={lists}
                                                     isNarrow={props.isNarrow}
                                                     emailVerified={props.user.emailVerified}
                                                     popup={isPopup}/>}
        </div>
        {sharePage && <SharePopup onSharePage={handleSetSharePage} handleShareList={handleShareList}
                                  handleUnshareList={handleUnshareList}
                                  user={props.user} list={currentList}/>}
        {deleteConfirmPage && <DeletePopup onDeleteConfirm={handleSetDeleteConfirmPage}
                                           listname={currentListName}
                                           mainCollection={collectionName}
                                           db={props.db}
                                           listid={currentListId}
                                           handleDeleteList={handleDeleteList}/>}
        {settingsPopup && <SettingsPopup auth={props.auth} onSettingsPopup={handleSetSettingsPopup} />}
    </div>;
}

export default SignedInApp;
