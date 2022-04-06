import './DueDate.css';

function DueDate(props) {
    const cName = props.isNarrow? "dueDate squishDate" : "dueDate";
    return <div className={cName}>
            <label htmlFor={"sortSelector"} id={"dueDateLabel"}
                   aria-hidden={true}>Due:</label>
            <input type="date" className="dueDateInput"
                   value={props.dueDate} onChange={props.onChange}
                   aria-label="due date selector"
                   title={"due date"}/>
    </div>;
}

export default DueDate;
