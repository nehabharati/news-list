import React from 'react';
import './App.css';
import America from "./components/America"
import India from "./components/India"
import Canada from "./components/Canada"
import Navbar from "./components/Navbar"
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/tab1" exact component={America} />
        <Route path="/tab2" exact component={India} />
        <Route path="/tab3" exact component={Canada} />
      </Switch>
    </Router>
  )
}

export default App;
