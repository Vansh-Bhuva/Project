import { useState, useEffect, useCallback } from "react";
import ExpenseCard from "./ExpenseCard";
import { useSelector, useDispatch } from "react-redux";
import service from "../firebase/config";
import { setdoc } from "../app/expnseSlice";
import { Spinner } from "./index.js";

const ExpenseListComponent = () => {
  const [loader, setLoader] = useState();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.reducer.isLoggedIn);
  const auth_id = useSelector((state) => state.reducer.userid);

  const fetchData = useCallback(async () => {
    try {
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
    } catch (error) {
      console.log("Error :: ", error);
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    if (auth && auth_id) {
      fetchData();
    }
  }, [useSelector((state) => state.reducer.change)]);

  // useEffect(() => {
  //   if (auth_id) {
  //     fetchData();
  //   }
  // }, [auth_id]);

  let data = useSelector((state) => state.reducer.data);
  data = Array.isArray(data) ? data : [] 
  
  return (
    <div className="p-4">
      {!loader ? (
         data.length > 0 ?
          data.map((expense, index) => (
            <ExpenseCard key={index} expense={expense} />
          ))
         : "No Transactions Found"
          
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ExpenseListComponent;
