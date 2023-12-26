import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

function RootLayout() {
  return (
    <div style={{ position: "relative" }}>
      <Header />
      <Outlet />
    </div>
  );
}

export default RootLayout;
