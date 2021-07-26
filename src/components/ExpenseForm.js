import React from "react";
import { MdSend } from "react-icons/md";

export const ExpenseForm = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit,
}) => {
  // we are destructing the values passed from the app.js {charge,amount,handleCharge,handleAmount,handleSubmit}
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>

          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="e.g. rent"
            value={charge}
            onChange={handleCharge}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">amount</label>

          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="e.g. 100"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>

      <button type="submit" className="btn">
        {edit ? "edit" : "submit"}
        {/* initially edit state is false..to yha pe submit dikhega...pr agr wo true hui to
edit dikhega button ke text pe */}

        <MdSend className="btn-icon" />
      </button>
    </form>
  );
};

export default ExpenseForm;
