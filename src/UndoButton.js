import "./UndoButton.css";

function UndoButton(props) {
    const canUndo = !(props.justDeleted.length === 0);
    return <button className={"undoButton " + (canUndo ? "" : "disabled")}
                   onClick={props.onClick} disabled={!canUndo}
                   aria-label={"undo last delete"} > ⤺
    </button>
}

export default UndoButton;