import { Route, Routes } from "react-router-dom";
import Footer from "./component/Footer/Footer";
import Header from "./component/Header/Header";
import Page404 from "./container/404Page/Page404";
import Cart from "./container/Cart/Cart";
import ChackOut from "./container/ChackOut.js/ChackOut";
import Contact from "./container/Contact/Contact";
import Home from "./container/Home/Home";
import Shop from "./container/Shop/Shop";
import ShopDetails from "./container/ShopDetails/ShopDetails";
import Testimonial from "./container/Testimonial/Testimonial";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ShopDetails />} />
        <Route path="/shopDetail" element={<ShopDetails />} />
        <Route path="/error" element={<Page404 />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/chackout" element={<ChackOut />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/testimonial" element={<Testimonial />} />
      </Routes>
      {/* <Home /> */}
      {/* <Shop /> */}
      {/* <ShopDetails /> */}
      {/* <Page404 /> */}
      {/* <Cart /> */}
      {/* <ChackOut /> */}
      {/* <Contact /> */}
      {/* <Testimonial /> */}
      <Footer />
    </>
  );
}

export default App;
