import { useDispatch } from "react-redux";
import authService from "../firebase/Auth";
import { logout } from "../app/expnseSlice";
import Button from "./Button"

function Logout() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
     authService.logout().then(() => {
      dispatch(logout());
    });
  };
  
  return (
    <Button
      className="inline-block duration-200 bg-yellow-300 text-black rounded-sm cursor-pointer"
      onClick={logoutHandler}
    >
      Logout
    </Button>
  );
}

export default Logout;