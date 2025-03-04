import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "./firebase/Auth";
import { login as loginStore, logout } from "./app/expnseSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Footer, Spinner } from "./Component";
import { Analytics } from "@vercel/analytics/react";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.reducer.isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(loginStore(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => console.log("Error getting user:", error))
      .finally(() => setLoading(false));
  }, []); // ✅ Add dispatch to dependencies

  return (
    <>
      {!loading ? (
        <div className="min-h-screen flex-wrap dark:bg-gray-500">
          <div className="w-full block">
            {auth && <Navbar />}
            <div className="container mx-auto p-6">
              <main>
                <Outlet></Outlet>
              </main>
            </div>
            {auth && <Footer />}
          </div>
        </div>
      ) : (
        <Spinner />
      )}

      <Analytics />
    </>
  );
}

export default App;
