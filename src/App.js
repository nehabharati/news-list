import React, { useState } from 'react';
import './App.css';
import Content from "./components/Content"
import { Tab, Tabs } from "react-bootstrap"
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

function App() {
  const [activeTab, setActiveTab] = useState(1)

  function handleSelect(selectedTab) {
    setActiveTab(selectedTab)
    console.log(selectedTab)
  }

  return (
    <Router>
      <Switch>
        <Tabs activeKey={activeTab} onSelect={handleSelect} style={{ backgroundColor: "none" }}>
          <Tab eventKey={1} title="US"><Route path="/" exact render={props => <Content {...props} url={"https://newsapi.org/v2/top-headlines?country=us&apiKey=028a318abd9e4364b0a32f66b822287b&pageSize=100"} title={"Top news in the US"} />} /></Tab>
          <Tab eventKey={2} title="India"><Route path="/tab2" render={props => <Content {...props} url={"https://newsapi.org/v2/top-headlines?country=in&apiKey=028a318abd9e4364b0a32f66b822287b&pageSize=100"} title={"Top news in India"} />} /></Tab>
          <Tab eventKey={3} title="Canada"><Route path="/" exact render={props => <Content {...props} url={"https://newsapi.org/v2/top-headlines?country=ca&apiKey=028a318abd9e4364b0a32f66b822287b&pageSize=100"} title={"Top news in Canada"} />} /></Tab>
        </Tabs>
      </Switch>
    </Router>
  )

}


export default App;
