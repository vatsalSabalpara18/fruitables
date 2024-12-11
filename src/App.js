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
      {/* <Home /> */}
      {/* <Shop /> */}
      {/* <ShopDetails /> */}
      {/* <Page404 /> */}
      {/* <Cart /> */}
      {/* <ChackOut /> */}
      {/* <Contact /> */}
      <Testimonial />
      <Footer />
    </>
  );
}

export default App;
