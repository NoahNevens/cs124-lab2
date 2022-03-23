import React from 'react';
import './App.css';
import Header from './Header.js';
import TaskList from './TaskList.js';
import BottomButtons from './BottomButtons.js';
import {query, collection, doc, setDoc, deleteDoc, serverTimestamp, where} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";


function App(props) {

    const collectionName = "task-list";
    const q = query(collection(props.db, collectionName));
    const [people, loading, error] = useCollectionData(q);

    const [hideCompleted, setHideCompleted] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);

    if(error) {
        console.log("error!");
    }

    // is this right???
    // const uncompletedData = people.filter(t => !t.completed);
    const uncompletedData = query(collection(props.db, collectionName), where("completed", "==", "false"));

    function handleChangeField(taskId, field, value) {
        setDoc(doc(props.db, collectionName, taskId), {[field]:value}, {merge:true});
    }

    function handleItemDeleted(taskId) {
        deleteDoc(doc(props.db, collectionName, taskId));
    }

    function handleClearCompleted() {
        // idk if this is right...
        const toDelete = query(collection(props.db, collectionName), where("completed", "==", "true"));
        for (const taskDoc of toDelete) {
            deleteDoc(taskDoc);
        }
        // setData(people.filter(task => !task.completed))
    }

    function handleAddTask(taskValue) {
        // not allowed to have more than 1 blank task at a time
        for (const task of people) {
            if (task.value === "") {
                return;
            }
        }

        const newId = generateUniqueID();
        setDoc(doc(props.db, collectionName, newId),
            {id: newId,
             value: taskValue,
             completed: false,
            created: serverTimestamp() });
    }

    function handleToggleCompletedItems() {
        setHideCompleted(!hideCompleted);
    }

    function handleMouseOver() {
        setMouseOver(!mouseOver);
    }

    function handleMouseOut() {
        setMouseOver(!mouseOver);
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    else {
        return (
            <div className="App">
                <Header/>
                <TaskList data={hideCompleted ? uncompletedData : people}
                          onTaskChangeField={handleChangeField}
                          onAddTask={handleAddTask}
                          onItemDeleted={handleItemDeleted}/>
                <BottomButtons onToggleCompletedItems={() => handleToggleCompletedItems()}
                               onClearCompletedItems={() => handleClearCompleted()}
                               onMouseOver={() => handleMouseOver()}
                               onMouseOut={() => handleMouseOut()}
                               isHideCompleted={hideCompleted}
                               isMouseOver={mouseOver}/>
            </div>
        );
    }
}

export default App;
