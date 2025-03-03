import { useState, useEffect } from "react";
import ExpenseCard from "./ExpenseCard";
import { useSelector, useDispatch } from "react-redux";
import service from "../firebase/config";
import { setdoc } from "../app/expnseSlice";
import { Spinner } from "./index.js";
import { doc } from "firebase/firestore";

const ExpenseListComponent = () => {
  const [loader, setLoader] = useState();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.reducer.isLoggedIn);
  const auth_id = useSelector((state) => state.reducer.userid);

  async function fetchData() {
    setLoader(true);

    const info = await service.getPosts(auth_id);

    const dataArray = [];    

    info.forEach((doc) => {
      const docData = doc.data();

      dataArray.push({
        data: {
          id: doc.id,
          ...docData,
          Date: new Date(docData.Date.seconds * 1000).toDateString(), // Convert Firestore timestamp to string
        },
      });
    });

    dispatch(setdoc(dataArray)); // Store all documents in state
    setLoader(false);
  }

  useEffect(() => {
    if (auth) {
      fetchData();
    }
  }, [useSelector((state) => state.reducer.change)]);

  let data = useSelector((state) => state.reducer.data);

  return (
    <div className="p-4">
      {!loader ? (
        data.map((expense, index) => (
          <ExpenseCard key={index} expense={expense} />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ExpenseListComponent;
