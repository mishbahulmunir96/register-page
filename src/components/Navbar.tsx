import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Menu from "./elements/Menu";
import { fetchUsers, selectUsersCount } from "../redux/slices/usersSlices";
import { useEffect } from "react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const usersCount = useAppSelector(selectUsersCount);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div
      className="w-full h-16
     bg-blue-500 flex items-center fixed top-0 px-32 justify-between text-white  font-semibold text-lg"
    >
      <nav className="flex justify-center items-center">
        <ul className="flex justify-around gap-10  ">
          <Menu to="/register">Register Page</Menu>
          <Menu to="/users">Users List</Menu>
        </ul>
      </nav>

      <div>
        <p>User Sign Up: {usersCount}</p>
      </div>
    </div>
  );
};

export default Navbar;
