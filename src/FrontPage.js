import "./FrontPage.css";
import Header from "./Header.js"

function FrontPage(props) {

    return <div className="frontpage">
        <Header />
        <h2>Select list to load: </h2>
        <div id="list_options">
            { props.lists.map(list => <button className="list_button"
                                              key={list.id}
                                              onClick={e => props.onEnter(list.id)}> {list.name}
            </button>) }
        </div>
    </div>

}

export default FrontPage;