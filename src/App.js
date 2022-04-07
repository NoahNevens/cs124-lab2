import './App.css';
import Header from './Header.js';
import TaskList from './TaskList.js';
import BottomButtons from './BottomButtons.js';
import SortButton from './SortButton.js';
import AscendButton from "./AscendButton";
import UndoButton from "./UndoButton";
import {collection, doc, setDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {useMediaQuery} from "react-responsive";
import LoadingScreen from "./LoadingScreen";


function App(props) {
    const isNarrow = useMediaQuery({maxWidth: 580});

    const [hideCompleted, setHideCompleted] = useState(false);
    const [sortBy, setSortBy] = useState("created");
    const [ascending, setAscending] = useState(true);
    const [justDeleted, setJustDeleted] = useState([]);

    const order = ascending ? "asc" : "desc";
    const collectionName = "task-list";
    const q = query(collection(props.db, collectionName), orderBy(sortBy, order));
    const [tasks, loading, error] = useCollectionData(q);

    if (loading) {
        return <LoadingScreen />;
    }
    if(error) {
        return <div>Error! Uh oh</div>;
    }

    const uncompletedTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    function handleChangeField(taskId, field, value) {
        updateDoc(doc(props.db, collectionName, taskId), {[field]:value});
    }

    function handleItemDeleted(taskId) {
        deleteDoc(doc(props.db, collectionName, taskId));
    }

    function handleClearCompleted() {
        const toDelete = tasks.filter(task => task.completed);
        for (const task of toDelete) {
            handleItemDeleted(task.id);
        }
        setJustDeleted(toDelete);
    }

    function handleAddTask(taskValue) {
        // not allowed to have more than 1 blank task at a time
        for (const task of tasks) {
            if (task.value === "") {
                return;
            }
        }

        const newId = generateUniqueID();
        setDoc(doc(props.db, collectionName, newId),
            {id: newId,
                value: taskValue,
                completed: false,
                priority: "a",
                created: serverTimestamp(),
                dueDate: new Date()});
    }

    function handleUndoDelete() {
        for (const task of justDeleted) {
            setDoc(doc(props.db, collectionName, task.id), {...task})
        }
        setJustDeleted([]);
    }

    function handleToggleCompletedItems() {
        setHideCompleted(!hideCompleted);
    }

    function handleSortBy(sortType) {
        setSortBy(sortType);
    }

    function handleAscending() {
        setAscending(!ascending);
    }

    return <div className="App">
        <div id="content">
            <Header/>
            <SortButton onChange={(e) => handleSortBy(e.target.value)}
                        sortBy={sortBy} />
            <AscendButton ascending={ascending}
                          onClick={handleAscending}/>
            <UndoButton justDeleted={justDeleted}
                        onClick={handleUndoDelete} />
            <TaskList data={hideCompleted ? uncompletedTasks : tasks}
                      onTaskChangeField={handleChangeField}
                      onAddTask={handleAddTask}
                      onItemDeleted={handleItemDeleted}
                      isNarrow={isNarrow} />
        </div>
        {completedTasks.length >= 1 && <BottomButtons onToggleCompletedItems={() => handleToggleCompletedItems()}
                                                      onClearCompletedItems={() => handleClearCompleted()}
                                                      isHideCompleted={hideCompleted} />}

    </div>;
}

export default App;