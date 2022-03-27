import './App.css';
import Header from './Header.js';
import TaskList from './TaskList.js';
import BottomButtons from './BottomButtons.js';
import SortButton from './SortButton.js';
import {collection, doc, setDoc, deleteDoc, query, orderBy, serverTimestamp} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import AscendButton from "./AscendButton";
import UndoButton from "./UndoButton";

function App(props) {
    const [hideCompleted, setHideCompleted] = useState(false);
    const [sortBy, setSortBy] = useState("created");
    const [ascending, setAscending] = useState(true);
    const [justDeleted, setJustDeleted] = useState([]);

    const order = ascending ? "asc" : "desc";
    const collectionName = "task-list";
    const q = query(collection(props.db, collectionName), orderBy(sortBy, order));
    const [tasks, loading, error] = useCollectionData(q);

    if (loading) {
        return <div>Loading...</div>;
    }
    if(error) {
        return <div>Error! Uh oh</div>;
    }

    const uncompletedTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    function handleChangeField(taskId, field, value) {
        setDoc(doc(props.db, collectionName, taskId), {[field]:value}, {merge:true});
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
                priority: "high",
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
            <div id="task_section">
                <SortButton onChange={(e) => handleSortBy(e.target.value)}
                            sortBy={sortBy} />
                <AscendButton ascending={ascending}
                              onClick={handleAscending}/>
                <UndoButton justDeleted={justDeleted}
                            onClick={handleUndoDelete} />
                <TaskList data={hideCompleted ? uncompletedTasks : tasks}
                          onTaskChangeField={handleChangeField}
                          onAddTask={handleAddTask}
                          onItemDeleted={handleItemDeleted} />
            </div>
        </div>
        {completedTasks.length >= 1 && <BottomButtons onToggleCompletedItems={() => handleToggleCompletedItems()}
                       onClearCompletedItems={() => handleClearCompleted()}
                       isHideCompleted={hideCompleted} />}

    </div>;
}

export default App;
