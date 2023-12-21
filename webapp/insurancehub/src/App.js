import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Nav from "./components/nav/Nav.jsx";
import Footer from "./components/nav/Footer.jsx";
import Aboutpage from "./components/Aboutpage.jsx";
import HomeInsurance from "./components/insurancelanding/HomeInsurance.jsx";
import AutomobileInsurance from "./components/insurancelanding/AutomobileInsurance.jsx";
import LifeInsurance from "./components/insurancelanding/LifeInsurance.jsx";
import Login from "./components/login/Login.jsx";
import CustomerHome from "./components/customer/CustomerHome.jsx";
import { useSelector } from "react-redux";
import PageNotFound from "./components/PageNotFound.jsx";
import LifeForm from "./components/forms/Lifeform.jsx";
import HomeForm from "./components/forms/Homeform.jsx";
import AutoForm from "./components/forms/Autoform.jsx";
import AdminHome from "./components/admin/AdminHome.jsx";
import Checkout from "./components/forms/Checkout.jsx";

function App() {
  const location = useLocation();
  // const hideFooterPaths = ["/login", "/home", "/life", "/auto"];
  const hideFooterPaths = ["/login"];
  const hideFooter = hideFooterPaths.some((path) =>
    location.pathname.includes(path)
  );

  const isAuth = Boolean(useSelector((state) => state.auth.user));

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/home" element={<HomeInsurance />} />
        <Route path="/auto" element={<AutomobileInsurance />} />
        <Route path="/life" element={<LifeInsurance />} />
        <Route path="/home/quote" element={<HomeForm />} />
        <Route path="/life/quote" element={<LifeForm />} />
        <Route
          path="/auto/car/quote"
          element={<AutoForm vehicleType={"car"} />}
        />
        <Route
          path="/auto/motorcycle/quote"
          element={<AutoForm vehicleType={"motorcycle"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/profile/:username"
          element={isAuth ? <CustomerHome /> : <Navigate to="/" />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
