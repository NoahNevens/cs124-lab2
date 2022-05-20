import "./UndoButton.css";
import "./TopButton.css";

function UndoButtonTask(props) {
    return <button className="top_button undo_button"
                   onClick={props.onClick}
                   disabled={props.justDeleted.length === 0}
                   title="undo delete tasks"
                   aria-label={"undo last delete tasks"}
                   tabIndex={props.popup ? -1 : 0}> ⤺
    </button>
}

export default UndoButtonTask;