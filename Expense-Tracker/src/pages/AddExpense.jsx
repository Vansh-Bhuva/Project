import { useForm } from "react-hook-form";
import { Input } from "../Component/index";
import { Button, RadioGroup } from "../Component/index";
import service from "../firebase/config";
import { Timestamp } from "firebase/firestore";
import { useSelector } from "react-redux";

const AddExpense = () => {
  const { register, handleSubmit, reset } = useForm();
  const auth_id = useSelector((state) => state.reducer.userid)

  const Insert = async (data) => {
    const datestring = data.Date;
    const timestamp = Timestamp.fromDate(new Date(datestring));
    console.log("Submitted Data:", data);
    service.createPost(data.Category, parseInt(data.Amount), timestamp, data.type, auth_id);
    reset(); // Clears the form after submission
  };

  return (
    <div className="p-6  dark:text-amber-300">
      <h1 className="text-2xl font-bold mb-4 dark:text-amber-300">Add Expense</h1>
      <form
        className="bg-white p-6 rounded-lg shadow-2xl dark:bg-gray-600" 
        onSubmit={handleSubmit(Insert)}
      >
        <Input
          label="Category"
          placeholder="Enter category"
          {...register("Category", { required: true })}
        />
        <Input
          label="Amount"
          type="number"
          placeholder="Enter amount"
          {...register("Amount", { required: true })}
        />
        <RadioGroup
          label="Transaction Type"
          name="transactionType"
          options={[
            { value: "income", label: "Income" },
            { value: "expense", label: "Expense" },
          ]}
          {...register("type",{required : true})}
        />

        <Input
          label="Date"
          type="Date"
          placeholder="Enter Date"
          {...register("Date", { required: true })}
        />
        <Button type="submit" className="bg-green-600 text-white mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddExpense;
