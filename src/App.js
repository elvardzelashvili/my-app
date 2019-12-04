import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Person from "./components/person";
import Car from "./components/car";
import Main from "./components/main";
import "./reset.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-main">
        <header className="App-header">
          <h2>აპლიკაცია ძებნის სისტემით</h2>
          <nav>
            <ul className="app-ul flex-row">
              <li>
                <Link to={"/"}>მთავარი</Link>
              </li>
              <li>
                <Link to={"/components/person"}>პიროვნება</Link>
              </li>
              <li>
                <Link to={"/components/car"}>მანქანა</Link>
              </li>
            </ul>
            <Switch>
              <Route exact path="/" component={Main}></Route>
              <Route exact path="/components/person" component={Person}></Route>
              <Route exact path="/components/car" component={Car}></Route>
            </Switch>
          </nav>
        </header>
      </div>
    </Router>
  );
}

export default App;
