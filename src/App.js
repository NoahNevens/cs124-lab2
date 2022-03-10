import React from 'react';
import './App.css';
import Header from './Header.js';
import TaskList from './TaskList.js';
import BottomButtons from './BottomButtons.js';
import {useState} from "react";


function App(props) {
    const [data, setData] = useState(props.initialData);
    const [showOnlyUncomplete, setShowOnlyUncomplete] = useState(false);
    const [nextId, setNextId] = useState(data.length + 1);
    const [mouseOver, setMouseOver] = useState(false);

    const filteredData = data.filter(t => !t.completed);

    function handleChangeField(taskId, field, value) {
        setData(data.map(
            t => t.id === taskId ? {...t, [field]:value} : t
        ))
    }

    function handleItemDeleted(taskID) {
        setData(data.filter((task) => task.id !== taskID));
    }

    function handleClearCompleted() {
        setData(data.filter(task => !task.completed))
    }

    function handleAddTask(taskValue) {
        for (const task of data) {
            if (task.value === "") {
                return;
            }
        }
        const newTask = { id: "task"+String(nextId),
                          value: taskValue,
                          completed: false };
        setNextId(nextId + 1);
        setData([].concat(data, [newTask]));
    }

    const regBgColor = "white";
    const newBgColor = "radial-gradient(rgb(0, 114, 185), rgb(0, 60, 255))";
    const regTxtColor = "rgb(15, 116, 231)";
    const newTxtColor = "white";

    function handleToggleCompletedItems(event) {
        setShowOnlyUncomplete(!showOnlyUncomplete);
        event.target.style.color = showOnlyUncomplete ? regTxtColor : newTxtColor;
        event.target.style.background = showOnlyUncomplete ? regBgColor : newBgColor;
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
          <TaskList data={showOnlyUncomplete ? filteredData : data}
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
