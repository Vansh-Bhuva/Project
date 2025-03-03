import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import { Button, Input, RadioGroup } from "./index";
import service from "../firebase/config";
import { changeIndoc } from "../app/expnseSlice";
import { useDispatch } from "react-redux";
import { Timestamp } from "firebase/firestore";

export default function UpdateExpense({ expense, onClose}) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose(); // Call the parent function to update state in ExpenseCard
  };

  const formattedDate = expense?.data?.Date 
  ? new Date(expense.data.Date).toLocaleDateString('en-CA')
  : "";
  
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      Category: expense?.data.Category || "",
      Amount: expense?.data.Amount || "",
      type: expense?.data.type || "",
      Date : formattedDate,
    }, 
  });

  const updateexpense = async (data) => {
    const datestring = data.Date;
    const timestamp = Timestamp.fromDate(new Date(datestring));

    await service.updateCard(
      expense.data.id,
      data.Category,
      parseInt(data.Amount),
      timestamp,
      data.type,
    );
    handleClose();
    reset(); // Clears the form after submission
    dispatch(changeIndoc());
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10 ">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center">
        <DialogPanel className="bg-white p-6 rounded-lg shadow-lg w-96 dark:bg-gray-700 dark:text-amber-300">
          <DialogTitle className="text-lg font-bold">
            Update Expense
          </DialogTitle>   
          {/* Form Inputs (Modify as needed) */}
          <form onSubmit={handleSubmit(updateexpense)}>
            <div className="mt-4">
              <Input
                type="text"
                {...register("Category", { required: true })}
                className="w-full p-2 border rounded"
              />
              <Input
                type="number"
                {...register("Amount", { required: true })}
                className="w-full p-2 border rounded mt-2"
              />
              <RadioGroup
                label="Transaction Type"
                name="transactionType"
                options={[
                  { value: "income", label: "Income" ,},
                  { value: "expense", label: "Expense" },
                ]}
                {...register("type")}
                
              />
              <Input
                type="date" 
                {...register("Date", { required: true })}
                className="w-full p-2 border rounded mt-2"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleClose}
                className="bg-gray-500 text-white px-3 py-2 rounded mr-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-600 text-white px-3 py-2 rounded"
              >
                Update
              </Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
