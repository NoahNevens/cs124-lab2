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

function App(props) {
    const [hideCompleted, setHideCompleted] = useState(false);
    const [sortBy, setSortBy] = useState("created");
    const [ascending, setAscending] = useState(true);
    const [taskOverFlow, setTaskOverFlow] = useState(false);

    const order = ascending ? "asc" : "desc";
    const collectionName = "task-list";
    const q = query(collection(props.db, collectionName), orderBy(sortBy, order));  // how  to sort??
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
        if (tasks.length <= 10) {
            setTaskOverFlow(false);
        }
    }

    function handleClearCompleted() {
        const toDelete = tasks.filter(task => task.completed);
        for (const task of toDelete) {
            handleItemDeleted(task.id);
        }
    }

    function handleAddTask(taskValue) {
        // if (tasks.length >= 10) {
        //     setTaskOverFlow(true);
        //     setTimeout(function() {
        //         setTaskOverFlow(false)
        //     }, 2500);
        //     return;
        // }
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
                date: new Date()});
    }

    function handleToggleCompletedItems() {
        setHideCompleted(!hideCompleted);
        console.log('toggle');
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
            <TaskList data={hideCompleted ? uncompletedTasks : tasks}
                      onTaskChangeField={handleChangeField}
                      onAddTask={handleAddTask}
                      onItemDeleted={handleItemDeleted} />
            </div>
        </div>
        {/*{taskOverFlow && <div className={"taskOverFlow"}>10 task limit reached. Get premium for more!</div>}*/}
        {completedTasks.length >= 1 && <BottomButtons onToggleCompletedItems={() => handleToggleCompletedItems()}
                       onClearCompletedItems={() => handleClearCompleted()}
                       isHideCompleted={hideCompleted} />}

    </div>;
}

export default App;
