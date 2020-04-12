import React, { useState } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';

import uuid from 'uuid/v4'

const initialExpense = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "laundry", amount: 1800 },
  { id: uuid(), charge: "clothe", amount: 2600 },
]



function App() {
  const [expenses, setExpenses] = useState(initialExpense);

  return (
    <>

      <Alert />
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        total spending: {" "}
        <span className="total">
          $ {" "}
          {expenses.reduce((acc, curr) => {
            return (acc += curr.amount)
          }, 0)}
        </span>
      </h1>



    </>
  );
}

export default App;
