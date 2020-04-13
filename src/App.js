import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';

import uuid from 'uuid/v4'

//const initialExpense = [
 //{ id: uuid(), charge: "rent", amount: 1600 },
  //{ id: uuid(), charge: "laundry", amount: 1800 },
  //{ id: uuid(), charge: "clothe", amount: 2600 },
//]

const initialExpense = localStorage.getItem("expenses") ? 
JSON.parse(localStorage.getItem("expenses")) : [];



function App() {
  // ************** state values **************
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpense);
  // single expense
  const [charge, setCharge] = useState('');
  // single amount
  const [amount, setAmount] = useState('');

  const [alert, setAlert] = useState({show:false});

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

// ***************use effect****************

useEffect(()=>{
  console.log('wec called useeffect');
  localStorage.setItem("expenses", JSON.stringify(expenses));
}, [expenses]);


// ***************functionality****************
  const handleCharge = e => {
    console.log(`charge : ${e.target.value}`);
    setCharge(e.target.value);
  }

  const handleAmount = e => {
    console.log(`amount : ${e.target.value}`);
    setAmount(e.target.value);
  }
  
   const handleAlert = ({text, type}) => {
     setAlert({show:true, text, type})
     setTimeout(()=>{
       setAlert({show:false});
     }, 3000)
   }
  const handleSubmit = e => {
    e.preventDefault();
    if(charge !== "" && amount >= 0){
        if(edit){
          let tempExpenses = expenses.map(item=>{
            return item.id===id ? {...item, charge, amount} : item;
          });
          setExpenses(tempExpenses);
          setEdit(false);
          handleAlert({type:"success", text:"item edited" });
        }else{
          const singleExpense = { id:uuid(), charge, amount };
        setExpenses([...expenses, singleExpense])
        handleAlert({type:"success", text:"item added" });
        }
        
        setAmount("");
        setCharge("");

    }else{
      handleAlert({type:"danger", text:`charge can't be empty and amount must be bigger than zero`});
    }
    
  }

  // handle delete
  const handleDelete = id => {
    let tempExpenses = expenses.filter(item=>item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({type:"danger", text: "item deleted"});

  }
  // handle edit
  const handleEdit = id =>{
    let expense = expenses.find(item=>item.id === id);
    let {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }
  // clearItem
  const clearItems = ()=>{
    setExpenses([]);
    handleAlert({type:"danger", text: "all items deleted"});
  }


  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text}/> }
      <Alert />
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm 
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList expenses={expenses} 
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
          
        />
      </main>
      <h1>
        total spending: {" "}
        <span className="total">
          $ {" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount))
          }, 0)}
        </span>
      </h1>



    </>
  );
}

export default App;
