import { useSelector } from "react-redux";
import { SummaryCard, ExpenseListComponent } from "../Component/index";

const Home = () => {
  const paisa = useSelector((state) => state.reducer.data);

  let expenseTotal = 0;

  let incomeTotal = 0;

  const sumFunction = (a, b) => a + b;

  paisa.forEach((element) => {
    if (element.data.type == "expense") {
      expenseTotal = sumFunction(expenseTotal, element.data.Amount);
    } else {
      incomeTotal = sumFunction(incomeTotal, element.data.Amount);
    }
  });

  return (
    <div className="p-6 bg-amber-300 dark:bg-gray-700 dark:text-yellow-300 rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <SummaryCard
          title="Balance"
          amount={incomeTotal - expenseTotal}
          color="bg-white"
          className="dark:bg-gray-600 dark:text-amber-300"
        />
        <SummaryCard
          title="Income"
          amount={incomeTotal}
          color="bg-white"
          className="text-green-600 dark:bg-gray-600"
        />
        <SummaryCard
          title="Expenses"
          amount={expenseTotal}
          color="bg-white"
          className="text-red-400 dark:bg-gray-600"
        />
      </div>

      {/* Expense List */}
      <h2 className="text-xl font-semibold mb-2">All Transactions</h2>
      <ExpenseListComponent />
    </div>
  );
};

export default Home;
