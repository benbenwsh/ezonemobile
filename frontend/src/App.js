import { useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { Register } from "./pages/Register";
import { Shop } from "./pages/Shop";
import { StockList } from "./pages/StockList/StockList";
import { MoreDetails } from "./pages/MoreDetails";
import { Upload } from "./pages/Upload";
import { About } from "./pages/About/About";
import { ContactUs } from "./pages/ContactUs";
import { NotFound } from "./pages/NotFound/NotFound";
import {Admin} from "./pages/Admin/Admin";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar/NavigationBar";

export default function App() {

  const navigate = useNavigate()

  const authenticate = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/signin")
    }
  }, [])

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Shop />} />
        {/* <Route
          path="/signin"
          element={
            isSignedIn ? (
              <Navigate to="/" />
            ) : (
              <SignIn setIsSignedIn={setIsSignedIn} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isSignedIn ? (
              <Navigate to="/" />
            ) : (
              <Register setIsSignedIn={setIsSignedIn} />
            )
          }
        /> */}

        <Route path="/shop/:model_name" element={<StockList />} />
        <Route path="/shop/:model_name/:item_id" element={<MoreDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/admin" element={<Admin authenticate={authenticate}/>}/>
        <Route path="/admin/upload" element={<Upload authenticate={authenticate}/>} />
        {/* <Route path="/admin/delete" element={<Delete />} /> */}
        <Route path="/admin/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </>
  );
}
