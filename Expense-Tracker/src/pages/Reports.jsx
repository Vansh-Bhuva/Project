import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
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
  const auth_id = useSelector((state)=>state.reducer.userid)

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

  return (
    <div className="p-6 dark:text-amber-300">
      <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>
      <div className="flex justify-center">
        <PieChart width={400} height={400}>
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
      </div>
    </div>
  );
};

export default Reports;
