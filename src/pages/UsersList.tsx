import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import axios from "axios";
import { setUser } from "../redux/slices/usersSlices";

const UsersList = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users");
        dispatch(setUser(response.data));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [dispatch]);
  return (
    <div className="h-screen w-full px-32 pt-24">
      <div className="container m-auto">
        <div className="flex flex-col items-center">
          <h2 className="my-4 text-2xl font-semibold">Users List</h2>
          <table className="w-full">
            <tr className="text-left">
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>

            {users.map((user) => (
              <tr className="h-12">
                <>
                  <td key={user.id}>{user.name}</td>
                  <td key={user.id}>{user.email}</td>
                  <td key={user.id}>{user.password}</td>
                </>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
