import { FC } from "react";
import { Link } from "react-router-dom";

interface MenuProps {
  to: string;
  children: string;
}

const Menu: FC<MenuProps> = ({ to, children }) => {
  return (
    <li className="hover:bg-slate-500 p-2 rounded-md ">
      <Link to={to}>{children}</Link>
    </li>
  );
};

export default Menu;
