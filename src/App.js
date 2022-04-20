import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import AddStudent from "./components/add-student.component";
import Student from "./components/student.component";
import StudentsList from "./components/students-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/students" className="navbar-brand">
            Students Application
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/students"} className="nav-link">
                Students
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/create"} className="nav-link">
                Create/Register
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/students"]} component={StudentsList} />
            <Route exact path="/create" component={AddStudent} />
            <Route path="/students/:id" component={Student} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
