import ExpenseListComponent from "../Component/ExpenseListComponent"

const ExpensePage = () => {
    const expenses = [
        { category: "Food", date: "2025-02-18", amount: 200 },
        { category: "Transport", date: "2025-02-17", amount: 50 },
        { category: "Shopping", date: "2025-02-16", amount: 100 },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Expenses</h1>
            <ExpenseListComponent expenses={expenses} />
        </div>
    );
};

export default ExpensePage;
