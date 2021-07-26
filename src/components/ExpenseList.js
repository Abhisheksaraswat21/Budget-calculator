import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

export const ExpenseList = ({
  expenses,
  handleEdit,
  handleDelete,
  clearItems,
}) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          // here we take initialexpense in the name of expense and all the data of initial expense

          return (
            <Item
              key={expense.id}
              expense={expense}
              handleDelete={handleDelete} //handle delete me handledelete fn paas kia jo upar humne distruct kia tha
              //ye humne app.js se paas kia tha
              handleEdit={handleEdit}
            />
          );

          // we are returing the id of the initalexpense in the key
          // also here we are passing all the data of the expense with the name of expense
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          clear expenses
          {/* if expenses array is not empty, mtlb koi saaman lia hua hai to iska mtlb hai koi
   ek button dikHEGA..CLEAR XPENSE kyuki wo && ke baad lia hu ahai */}
          <MdDelete className="btn-icon" />
          {/* ye humnee react icons se lia hai .... mddelete taaki dustbin bana aaye wha */}
        </button>
      )}
    </>
  );
};
