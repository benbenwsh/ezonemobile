import { useEffect, useState } from "react";
import { Route, Routes, Navigate, redirect } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { Register } from "./pages/Register";
import { Shop } from "./pages/Shop";
import { ItemDetails } from "./pages/ItemDetals/ItemDetails";
import { Upload } from "./pages/Upload";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound/NotFound";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { StockList } from "./pages/StockList/StockList";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // console.log("isSignedIn: " + isSignedIn);
  }, [isSignedIn]);

  return (
    <>
      <NavigationBar isSignedIn={isSignedIn} />
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
        {/* <Route path="/shop/:item_id" element={<ItemDetails />} /> */}
        <Route path="/upload" element={<Upload />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
