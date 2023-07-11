import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { Register } from "./pages/Register";
import { Shop } from "./pages/Shop";
import { ItemDetails } from "./pages/ItemDetals/ItemDetails";
import { Upload } from "./pages/Upload";
import { Help } from "./pages/Help";
import { About } from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ItemDetails />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}
