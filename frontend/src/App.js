import React from 'react';
import './App.css';
import StudentTableComponent from './pages/student_table';
import { Route, Switch, Redirect } from 'react-router-dom';
import Monitor from './pages/monitor';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" render={() => (
          <Redirect to="/monitor" />
        )} />
        <Route exact path="/studentlist" component={StudentTableComponent} />
        <Route exact path="/monitor" component={Monitor} />
      </Switch>
    </div>
  );
}

export default App;
