import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

export const ExpenseItem = ({ expense, handleEdit, handleDelete }) => {

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
