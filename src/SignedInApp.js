import {useMediaQuery} from "react-responsive";
import {collection, deleteDoc, doc, query, serverTimestamp, setDoc, where} from "firebase/firestore";
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

function SignedInApp(props) {

    const collectionName = "task-lists";
    const qList = query(collection(props.db, collectionName),
        where("owner", "==", props.user.uid));
    const [lists, listLoading, listError] = useCollectionData(qList);

    const [currentListId, setCurrentListId] = useState("noList");
    const [currentListName, setCurrentListName] = useState("task-list");

    const [sharePage, setSharePage] = useState(false);

    if (listLoading) {
        return <LoadingScreen message="Loading..."/>;
    }
    if (listError) {
        return <div>Error! Uh oh</div>;
    }

    function handleAddList(listName) {
        const newId = generateUniqueID();
        setDoc(doc(props.db, collectionName, newId),
            {id: newId,
                name: listName,
                created: serverTimestamp(),
                owner: props.user.uid});
        setCurrentListId(newId);
        setCurrentListName(listName);
    }

    function handleDeleteList(listId) {
        deleteDoc(doc(props.db, collectionName, listId));
        setCurrentListId("noList");
        setCurrentListName("task-list");
    }

    function handleSetList(listId) {
        setCurrentListId(listId);
    }

    function handleSetSharePage(bool) {
        setSharePage(bool);
    }

    return <div className="SignedInApp">
        <div id="content">
            <UserBar user={props.user} isNarrow={props.isNarrow}
                     onClick={() => signOut(props.auth)} />
            <Header/>
            <div id="list_top_buttons">
                <ListSelector lists={lists}
                              currentListId={currentListId}
                              currentListName={currentListName}
                              onChange={(e) => {handleSetList(e.target.value)}}
                              onAddList={handleAddList} />
                <button className="top_button"
                        title="share list"
                        aria-label="share list"
                        onClick={() => handleSetSharePage(true)}>
                    <i className="fa-solid fa-user-group" />
                </button>
                <button className="top_button"
                        title="delete list"
                        aria-label="delete current list"
                        onClick={(e) => {handleDeleteList(currentListId)}} >
                    <i className="fa-solid fa-trash-can" s/>
                </button>
            </div>
            {currentListId !== "noList" && <TaskList db={props.db}
                                                     mainCollection={collectionName}
                                                     subId={currentListId}
                                                     subName={currentListName}
                                                     lists={lists}
                                                     isNarrow={props.isNarrow} />}
        </div>
        {sharePage && <SharePopup onSharePage={handleSetSharePage} />}
    </div>;
}

export default SignedInApp;