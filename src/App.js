import React from "react";
import "./App.css";
import { ExpenseList } from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import { v4 } from "uuid";
import { useState } from "react";
import { useEffect } from "react";

// const initialExpenses = [
//   { id: v4(), charge: "rent", amount: 1600 },
//   { id: v4(), charge: "car payment", amount: 400 },
//   { id: v4(), charge: "credit card bill", amount: 1200 },
// ];
//it will be an array and each item in this array will me an object
// uuid v4 is like giving uniaue id to the elements
//IS UPAR WAALEE DATA SE HI HUMNE YE PROGRAM BANAYA ...BUT AB HUM PREDEFINED NI CHAHTE VALUES KO KI
//STARTING ME YE VALES DISPLAY HO....ISILIYE

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
//agr yha pe humare paas expenses naam ka object hoga to json.parse wala
//milega hume wrna hume ek empty array milega
//ab baat ye hai ki is state ment ke upar koi bhi expenses nahi hai to mtlb ki hume ek empty array milega

console.log(initialExpenses);

function App() {
  //******************  state values  ****************
  //  all expenses, add expenses

  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState("");
  //this is for the charge input

  // single amount
  const [amount, setAmount] = useState("");
  //this is for the amount input

  const [alert, setAlert] = useState({ show: false });
  //we have passed an object here where a property show is declared with inital
  //value as false

  //edit
  const [edit, setEdit] = useState(false);
  //edit item
  const [id, setId] = useState(0);

  //******************  useEffect****************
  // it lets us perform side effects
  // runs after every render
  //first parameter - callback function (runs after render)

  // second parameter- array - for letting react know when to run useeffects.Alert
  // react re-renders when state has changed or props

  // it can be set up anywhere

  useEffect(() => {
    console.log("we called useEffect");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  //last me aray means ki it will run when expenses are changed only, will not go for infinite times

  //******************  functionality  ****************

  //handle charge
  const handleCharge = (e) => {
    // console.log("charge : ${e.target.value}");

    setCharge(e.target.value);
    //value is goint to be whatever we type in this particular input
    //jese hi charge me  kuch input hoga ye funciton generate hoga aur us input ki vaolue
    //lega aur setchage me daalega
  };

  //handle amount
  const handleAmount = (e) => {
    //  console.log("amount : ${e.target.value}");

    setAmount(e.target.value);
    //value is goint to be whatever we type in this particular input
    //jese hi charge me  kuch input hoga ye funciton generate hoga aur us input ki vaolue
    //lega aur setchage me daalega
  };

  //handle alert is called

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    //we are setting the type and text property in the alert state where we do not have
    //these property assigned
    setTimeout(() => {
      setAlert({ show: false }); //it means ki show will become false...mtlb outof display ho jayeg a jsut after 3 seconds
    }, 3000);
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    //to prevent it from loading everytime i click submit button

    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          //we are iterating ver the array and we are storing each element in the item

          return item.id === id ? { ...item, charge, amount } : item;
          //id is -- state wali id jo uhmne niche setid se change ki thi
        });
        // {...item,charge,amount} : item it means ki if true, it will return item ki saari values ke saath saath
        // charge , aur amount ki value (wo change ki hai isiliye alag krke likhi hai)
        // charge={charge} ese likh skte MdTheater..but agr property aur state kka name same hai to ek hi baar likhke kaam
        // chl jaata hai  ...mtlb bs charge aur amount hi overwrite horhi hai

        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const singleExpense = { id: v4(), charge, amount };
        //it is a feature of es6, if we have same name for the property and the value that we
        // state or variable, then we can use that name only,, like her it was charge

        setExpenses([...expenses, singleExpense]);
        // setExpenses([singleExpense]) its meaning is that we call set expense and owerwrite
        // the values with singleExpense..isse fir single expense ki ek bar ki value hi display hogi
        // baaki putani waali ni dikhegi...unke liy we have to use spread operator

        //here singleexpnse is an object and objects are passed as arrays in the function

        //  setExpenses([...expenses,singleExpense]);
        // we are taking all values of inital expenses, that is in expenses, and also
        // we are adding the new value that we are storing in the singlee expense

        handleAlert({ type: "success", text: "item added" });
      }

      setCharge("");
      setAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: `charge cant be empty value and
      amount has to be bigger than 0`,
      });
    }
  };

  // const result = useState(initialExpenses) ;
  // const expenses = result[0] ;
  // const setExpenses = result [1] ;

  //initial expenses is an array and we take that in result as initial value of use state
  // now in expenses we took 0 as we are taking the initial value of the array
  //similarly we took 1 as to get the value after the change

  //****** ALL THESE FUNCTIONS RE WORKING IN EXPENSE FORM
  //                                   SO WE PASS THEM THERE ********

  //CLEAR ALL ITEMS
  const clearItems = () => {
    setExpenses([]);
    //setexpenses ko empty array krida...mtlb item delete hojayenge saare items
    handleAlert({ type: "danger", text: `all items deleted` });
  };

  //handle delete
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    //it means expenses array hai...uske har element pe filter chla lga dia hai
    //usme item naam se value jaarhi hai, agr us item ki id us id se equal ni hui jo hum paas krrhe hai..
    //to wo return hoga

    setExpenses(tempExpenses);
    // iska mtlb ki setexpenses ki value wo hai jo match ni krrhe the id se...to wo hi display honge ab

    handleAlert({ type: "danger", text: `item deleted` });
  };

  //handle edit
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    //find expense array ke har element pe jaayega...item me har baar expense ke naye conpomemnt ki value store hogi
    //hum item ki jagah koi bhi naam de skte hai...to uski id agr humari wali id jo ki isme
    //paas horhi hai...uske equal hai to to wo expense me jayega
    console.log(expense);

    let { charge, amount } = expense;
    //expense me ab wo value hai jispe edit button click hua hai..to ab charge aur amount
    // state humne destructure kari...aur yha pe expense ka amount aur charge destructure waale me gya hai

    setCharge(charge); //ab setcharge ki value charge daal di jo expense ki wajah se change hogai  hai
    setAmount(amount);
    setEdit(true); //ab button pe editlikha aayega submit ki jah=gah
    setId(id); //we are passing the id here that comes from handledit
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      {/* if alert.show is true then only alert function is executed eith differnt properties
      type or text ko paas krne ke piche yhi reason hai ki alert.js me hume unka use kia hai */}

      <h1>budget-calculator</h1>

      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          //charge and amount are usestate values
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />

        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
          edit={edit}
          //here we passed edit state with the name edit in expense list
        />
        {/* here we are passing expenses (initial value) with the name of expenses */}
      </main>

      <h1>
        total spending :
        {
          <span className="total">
            ${" "}
            {expenses.reduce((acc, curr) => {
              // acc is having total amount, curr is having current

              return (acc += parseInt(curr.amount));
            }, 0)}
            {/* acc += curr.amount ...we added the current amount to previous amount
               we write 0 here as we are dealing with numbers 
              without parseint it was displaying it as a string but amountis an 
              interge so i added parse int to get in=t in the form of the num */}
          </span>
        }
      </h1>
    </>
  );
}

export default App;
