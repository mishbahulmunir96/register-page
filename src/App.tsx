import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterPages from "./pages/RegisterPages";
import UsersList from "./pages/UsersList";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<RegisterPages />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </>
  );
}

export default App;
