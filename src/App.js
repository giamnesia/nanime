import React from "react";
import "./App.css";
import "./styles/style.css";
import "semantic-ui-css/semantic.min.css";
import Main from "./components/Main";
import View from "./components/View";
import Navbar from "./components/Navbar";
import Top from "./components/Top";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Top} />
          <Route path="/main/:anime" component={Main} />
          <Route path="/view/:id" component={View} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
