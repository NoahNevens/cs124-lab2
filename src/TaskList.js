import Task from './Task';
import "./TaskList.css";
import AddButton from "./AddButton";

function TaskList(props) {

    return <div className="task_list">
        <div className="tasks">
            {
                props.data.map(task => <Task key={task.id} {...task}
                                             onTaskChangeField={props.onTaskChangeField}
                                             onItemDeleted={props.onItemDeleted}
                                             isNarrow={props.isNarrow}
                />)
            }
        </div>
        <AddButton onAddTask={props.onAddTask}/>
    </div>;

}

export default TaskList;