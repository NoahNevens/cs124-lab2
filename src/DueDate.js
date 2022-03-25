import './DueDate.css';

function DueDate(props) {
    return <div className={"dueDate"}>
        <label htmlFor={"sortSelector"} id={"dueDateLabel"}>Due:</label>
        <input type="date" className="dueDateInput" value={props.date} onChange={props.onChange}/>
    </div>
}

export default DueDate;