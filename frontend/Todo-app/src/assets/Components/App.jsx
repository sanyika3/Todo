import React from "react";
import Nav from "./Nav";
import Add from "./Add";
import Todo from "./Todo";


function App(){
    return <div className="App">
        <Nav />
        <Add />
        <div className="Container">
              <Todo />
        </div>
    </div>
}

export default App;