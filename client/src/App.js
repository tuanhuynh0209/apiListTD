import React, { Fragment } from "react";
import './App.css';
import ListTodo from "./component/ListTodo";
function App() {
  return (
    <Fragment>
      <div className="container">
        <ListTodo/>
      </div>
    </Fragment>
  );
}

export default App;
