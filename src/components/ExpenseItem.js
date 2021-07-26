import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

export const ExpenseItem = ({ expense, handleEdit, handleDelete }) => {
  //  we could have done it like expense: {id, whatever}

  const { id, charge, amount } = expense;

  return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        {/* this charge ki value is taken from expense */}

        <span className="amount">Rs {amount}</span>
      </div>

      <div>
        <button
          className="edit-btn"
          aria-label="edit button"
          onClick={() => handleEdit(id)}
        >
          <MdEdit />
          {/* this is the button taken from the react 
          in app.js where we have declared the handleEdit , we want an id ther taaki pta chle konsa wala delete krna hai...
          aur id yha se paas krne ke liye arrow funciton leke kia agr,....direct handleEdit krte to uskaa koi sens enin banta hai
          ....as a return from the arrow funtion we willl get our handler */}
        </button>

        <button
          className="clear-btn"
          aria-label="delete button"
          onClick={() => handleDelete(id)}
        >
          <MdDelete />
          {/* this is the button taken from the react */}
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
