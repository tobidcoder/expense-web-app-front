import React from 'react';
import './App.css';
import Header from './component/Header';
import ListExpense from './component/listExpense';
import CreateExpense from './component/createExpense';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    
      <Header />
      
   <Switch>
     <Route path="/" component={CreateExpense} exact={true} />
    
      <Route path="/view-expense" component= {ListExpense} />
    </Switch>
     
    </div>
    </BrowserRouter>
  );
}

export default App;
