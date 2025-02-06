import React from 'react';
import { Route, Routes } from "react-router-dom";
import Footer from "../component/Footer/Footer";
import Header from "../component/Header/Header";
import Page404 from "../container/404Page/Page404";
import Cart from "../container/Cart/Cart";
import ChackOut from "../container/ChackOut.js/ChackOut";
import Contact from "../container/Contact/Contact";
import Home from "../container/Home/Home";
import Shop from "../container/Shop/Shop";
import ShopDetails from "../container/ShopDetails/ShopDetails";
import Testimonial from "../container/Testimonial/Testimonial";
import UserRegisterPage from '../container/UserRegisterPage/UserRegisterPage';
import SubCategoryList from '../container/SubCategory/SubCategoryList';

function UserRoutes(props) {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:id" element={<ShopDetails />} />
                <Route path="/shop_detail" element={<ShopDetails />} />
                <Route path="/error" element={<Page404 />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/chackout" element={<ChackOut />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/testimonial" element={<Testimonial />} />
                <Route path="/register" element={<UserRegisterPage />} />
                <Route path='/subcategories/:cat_id' element={<SubCategoryList/>}/>
            </Routes>           
            <Footer />
        </>
    );
}

export default UserRoutes;