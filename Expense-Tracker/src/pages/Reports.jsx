import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import service from "../firebase/config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// const info = await service.getPost();
// const dataArray = [];

// info.forEach((doc) => {
//   const docData = doc.data();
//   if (docData.type === "expense") {
//     dataArray.push({
//       name: docData.Category,
//       value: docData.Amount,
//     });
//   }
// });

// const data = [
//   { name: "Home", value: 200 },
//   { name: "Transport", value: 50 },
//   { name: "Shopping", value: 100 },
// ];

function getRandomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

function getRandomColorsArray(size) {
  return Array.from({ length: size }, getRandomColor);
}

const COLORS = getRandomColorsArray(100);

const Reports = () => {
  const [data, setData] = useState([]);
  const auth_id = useSelector((state) => state.reducer.userid);

  const fetchData = async () => {
    const info = await service.getPosts(auth_id);

    info.forEach((doc) => {
      const docData = doc.data();
      if (docData.type === "expense") {
        setData((prev) => [
          ...prev,
          { name: docData.Category, value: docData.Amount },
        ]);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return data.length > 0 ? (
    <div className=" dark:text-amber-300 min-w-full min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>
      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center dark:text-amber-300">
      <h1>No Transactions Found</h1>
    </div>
  );
};

export default Reports;
