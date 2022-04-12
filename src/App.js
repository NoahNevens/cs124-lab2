import './App.css';
import FrontPage from './FrontPage.js'
import Header from './Header.js';
import TaskList from './TaskList.js';
import {collection, doc, setDoc, updateDoc, deleteDoc, query, serverTimestamp} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {useMediaQuery} from "react-responsive";
import LoadingScreen from "./LoadingScreen";
import ListSelector from "./ListSelector.js";

function App(props) {
    const isNarrow = useMediaQuery({maxWidth: 580});
    const [isEntered, setIsEntered] = useState(false);

    const collectionName = "task-lists";
    const qList = query(collection(props.db, collectionName));
    const [lists, listLoading, listError] = useCollectionData(qList);

    const [currentListId, setCurrentListId] = useState("1234");
    const [currentListName, setCurrentListName] = useState("task-list");

    if (listLoading) {
        return <LoadingScreen />;
    }
    if (listError) {
        return <div>Error! Uh oh</div>;
    }

    function handleAddList(listName) {
        const newId = generateUniqueID();
        setDoc(doc(props.db, collectionName, newId),
            {id: newId,
                name: listName,
                created: serverTimestamp()});
    }

    function handleDeleteList(listId) {
        deleteDoc(doc(props.db, collectionName, listId));
    }

    function handleSetList(listId) {
        console.log(listId);
        setCurrentListId(listId);
    }

    function handleSetName(listName) {
        setCurrentListName(listName);
    }

    function onEnter(selectedListId) {
        setIsEntered(true);
        setCurrentListId(selectedListId);
    }

    return <div className="App">
        {!isEntered && <FrontPage lists={lists}
                                  onEnter={onEnter} />}
        {isEntered &&
            <div id="content">
                <Header/>
                <div id="list_top_buttons">
                    <ListSelector lists={lists}
                                  currentList={currentListId}
                                  onChange={(e) => {handleSetList(e.target.value)}}
                                  onAddList={handleAddList} />
                    <button className="top_button"
                            disabled={lists.length <= 1}
                            onClick={(e) => {handleDeleteList(currentListId)}} >
                        <i className="fa-solid fa-trash-can" s/>
                    </button>
                </div>
                <TaskList db={props.db}
                          mainCollection={collectionName}
                          subId={currentListId}
                          subName={currentListName}
                          lists={lists}
                          isNarrow={isNarrow} />
            </div> }
    </div>;
}

export default App;