import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

function RootLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default RootLayout;
