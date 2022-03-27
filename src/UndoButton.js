import "./UndoButton.css";

function UndoButton(props) {
    return <button className="undoButton"
                   onClick={props.onClick}
                   disabled={props.justDeleted.length === 0}
                   title="undo"
                   aria-label={"undo last delete"} > ⤺
    </button>
}

export default UndoButton;