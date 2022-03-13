import React from 'react';
import './App.css';
import Header from './Header.js';
import TaskList from './TaskList.js';
import BottomButtons from './BottomButtons.js';
import {query, collection, doc, setDoc, deleteDoc} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useState} from "react";


function App(props) {

    const collectionName = "task-list";
    const q = query(collection(props.db, collectionName));
    const [people, loading, error] = useCollectionData(q);

    const [hideCompleted, setHideCompleted] = useState(false);
    const [nextId, setNextId] = useState(people.length + 1);
    const [mouseOver, setMouseOver] = useState(false);

    const uncompletedData = people.filter(t => !t.completed);
    // or should it be like query(collection(props.db, collectionName), where("completed", "==", "true") ?

    function handleChangeField(taskId, field, value) {
        setDoc(doc(props.db, collectionName, taskId), {[field]:value}, {merge:true});
    }

    function handleItemDeleted(taskId) {
        deleteDoc(doc(props.db, collectionName, taskId));
    }

    function handleClearCompleted() {
        setData(people.filter(task => !task.completed))
    }

    function handleAddTask(taskValue) {
        // not allowed to have more than 1 blank task at a time
        for (const task of people) {
            if (task.value === "") {
                return;
            }
        }

        const newId = "task"+String(nextId);
        setDoc(doc(props.db, collectionName, newId),
            {id: newId,
             value: taskValue,
             completed: false });
        setNextId(nextId + 1);
    }

    function handleToggleCompletedItems(event) {
        setHideCompleted(!hideCompleted);
    }

    function handleMouseOver(event) {
        setMouseOver(!mouseOver);
    }

    function handleMouseOut(event) {
        setMouseOver(!mouseOver);
    }

    return (
      <div className="App">
        <Header/>
          <TaskList data={hideCompleted ? uncompletedData : people}
                    onTaskChangeField={handleChangeField}
                    onAddTask={handleAddTask}
                    onItemDeleted={handleItemDeleted}/>
          <BottomButtons onToggleCompletedItems={(e) => handleToggleCompletedItems(e)}
                         onClearCompletedItems={() => handleClearCompleted()}
                         onMouseOver={(e) => handleMouseOver(e)}
                         onMouseOut={(e) => handleMouseOut(e)}
                         isHideCompleted={hideCompleted}
                         isMouseOver={mouseOver}/>
      </div>
    );
}

export default App;
