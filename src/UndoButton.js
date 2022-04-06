import "./UndoButton.css";
import "./TopButton.css";

function UndoButton(props) {
    return <button className="top_button undo_button"
                   onClick={props.onClick}
                   disabled={props.justDeleted.length === 0}
                   title="undo"
                   aria-label={"undo last delete"} > ⤺
    </button>
}

export default UndoButton;