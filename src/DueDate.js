import './DueDate.css';

function DueDate(props) {
    return <div className={"dueDate"}>
        <label htmlFor={"sortSelector"} id={"dueDateLabel"} aria-hidden={true}>Due:</label>
        <input type="date" className="dueDateInput"
               value={props.dueDate} onChange={props.onChange}
               aria-label="due date selector"
               title={"due date"}/>
    </div>
}

export default DueDate;