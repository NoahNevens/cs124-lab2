import Task from './Task';
import "./TaskList.css";
import AddTaskButton from "./AddTaskButton";
import {useState} from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import LoadingScreen from "./LoadingScreen";
import {deleteDoc, doc, serverTimestamp, setDoc, updateDoc, query, collection, orderBy} from "firebase/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import SortButton from "./SortButton";
import AscendButton from "./AscendButton";
import UndoButtonTask from "./UndoButtonTask";
import BottomButtons from "./BottomButtons";

function TaskList(props) {
    const [hideCompleted, setHideCompleted] = useState(false);
    const [sortBy, setSortBy] = useState("created");
    const [ascending, setAscending] = useState(true);
    const [justDeletedTasks, setJustDeletedTasks] = useState([]);

    const order = ascending ? "asc" : "desc";
    const q = query(collection(props.db, props.mainCollection, props.subId, props.subName), orderBy(sortBy, order));
    const [tasks, loading, error] = useCollectionData(q);

    if (loading) {
        return <LoadingScreen />;
    }
    if (error) {
        return <div>Error! Uh oh</div>;
    }

    const uncompletedTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);
    const data = hideCompleted ? uncompletedTasks : tasks;

    function handleChangeField(taskId, field, value) {
        updateDoc(doc(props.db, props.mainCollection, props.subId, props.subName, taskId), {[field]:value});
    }

    function handleItemDeleted(taskId) {
        deleteDoc(doc(props.db, props.mainCollection, props.subId, props.subName, taskId));
    }

    function handleClearCompleted() {
        const toDelete = tasks.filter(task => task.completed);
        for (const task of toDelete) {
            handleItemDeleted(task.id);
        }
        setJustDeletedTasks(toDelete);
    }

    function handleAddTask(taskValue) {
        // not allowed to have more than 1 blank task at a time
        for (const task of tasks) {
            if (task.value === "") {
                return;
            }
        }

        const newId = generateUniqueID();
        setDoc(doc(props.db, props.mainCollection, props.subId, props.subName, newId),
            {id: newId,
                value: taskValue,
                completed: false,
                priority: "a",
                created: serverTimestamp(),
                dueDate: new Date()});
    }

    function handleUndoDeleteTasks() {
        for (const task of justDeletedTasks) {
            setDoc(doc(props.db, props.mainCollection, props.subId, props.subName, task.id), {...task})
        }
        setJustDeletedTasks([]);
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

    return <div>
        <div id="sort_top_buttons">
            <SortButton onChange={(e) => handleSortBy(e.target.value)}
                        sortBy={sortBy} />
            <AscendButton ascending={ascending}
                          onClick={handleAscending}/>
            <UndoButtonTask justDeleted={justDeletedTasks}
                            onClick={handleUndoDeleteTasks} />
        </div>
        <div className="task_list">
            <div className="tasks">
                {
                    data.map(task => <Task key={task.id} {...task}
                                                 onTaskChangeField={handleChangeField}
                                                 onItemDeleted={handleItemDeleted}
                                                 isNarrow={props.isNarrow}
                    />)
                }
                <text/>
            </div>
            <AddTaskButton onAddTask={handleAddTask}/>
            {completedTasks.length >= 1 && <BottomButtons onToggleCompletedItems={() => handleToggleCompletedItems()}
                                                          onClearCompletedItems={() => handleClearCompleted()}
                                                          isHideCompleted={hideCompleted} />}

        </div>
    </div>;

}

export default TaskList;