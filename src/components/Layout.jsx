
import { Outlet } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const Layout = () => {
  useTitle('Maebrie Repair')
  return <Outlet />;
};



export default Layout;
