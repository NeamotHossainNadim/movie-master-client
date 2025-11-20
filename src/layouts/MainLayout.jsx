import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
}
