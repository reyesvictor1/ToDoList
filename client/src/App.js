import { Fragment } from 'react';

import './App.css';
import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';

function App() {
  // using <Fragment> is better than using <div>
  // this ensures that each component remains a direct child of the parent container
  return (
    <Fragment>
      <div className="container">
        <InputTodo/>
        <ListTodos/>
      </div>
    </Fragment>
  );
}

export default App;
