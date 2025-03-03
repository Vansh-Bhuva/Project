import { useState } from "react";
import { Button } from "./index";
import service from "../firebase/config";
import UpdateExpense from "./UpdateExpense"; // Import the modal component
import { useDispatch } from "react-redux";
import { changeIndoc } from "../app/expnseSlice.js";
import { Plus, Minus } from "lucide-react";

const ExpenseCard = ({ expense }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal visibility

  const dispatch = useDispatch();

  const handleDelete = async () => {
    await service.deleteCard(expense.data.id);
    dispatch(changeIndoc());
  };

  return (
    <div className="bg-white dark:bg-gray-600 dark:text-amber-300 shadow-lg rounded-2xl p-4 flex justify-between items-center mb-4 ">
      <div>
        <h3 className="text-lg font-semibold">{expense.data.Category}</h3>
        {expense.data.type == "expense" ? (
          <p className="flex items-center text-red-400 font-bold space-x-2">
            <Minus className="w-3 h-5 stroke-3" />
            <span>Expense</span>
          </p>
        ) : (
          <p className="flex items-center text-green-500 font-bold space-x-2">
            <Plus className="w-3 h-5 stroke-3" />
            <span>Income</span>
          </p>
        )}
        <p className="">{expense.data.Date}</p>
        <Button
          className="mt-2 bg-amber-200 hover:opacity-80 cursor-pointer"
          onClick={() => setIsModalOpen(true) } // Open modal on Edit button click
        >
          ✏️
        </Button>
        <Button
          onClick={handleDelete}
          className="mt-2 ml-2 bg-red-600 hover:bg-red-400 cursor-pointer text-white"
        >
          🗑️
        </Button>
      </div>
      {expense.data.type == "expense" ? (
        <span className="text-red-400 text-3xl font-bold">
          ₹{expense.data.Amount}
        </span>
      ) : (
        <span className="text-green-500 text-3xl font-bold">
          ₹{expense.data.Amount}
        </span>
      )}
      {/* <span className="text-red-500 font-bold text-3xl">₹{expense.data.Amount}</span> */}

      {/* Render the UpdateExpense modal if isModalOpen is true */}
      {isModalOpen && (
        <UpdateExpense
          expense={expense}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ExpenseCard;
