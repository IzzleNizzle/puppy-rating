import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './pages/NavBar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'


export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route
          path="/dashboard"
          component={Dashboard}
        />
        <Route component={() => "404 No Match Found"} />
      </Switch>
    </Router>
  )
}
