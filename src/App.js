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
        <Route path="/tab1" render={props => <America {...props} url={"https://newsapi.org/v2/top-headlines?country=us&apiKey=028a318abd9e4364b0a32f66b822287b&pageSize=100"} />} />
        <Route path="/tab2" render={props => <India {...props} url={"https://newsapi.org/v2/top-headlines?country=in&apiKey=028a318abd9e4364b0a32f66b822287b&pageSize=100"} />} />
        <Route path="/tab3" render={props => <Canada {...props} url={"https://newsapi.org/v2/top-headlines?country=ca&apiKey=028a318abd9e4364b0a32f66b822287b&pageSize=100"} />} />
      </Switch>
    </Router>
  )
}

export default App;
