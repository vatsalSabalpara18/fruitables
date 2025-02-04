import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Category from '../admin/Container/Category/Category';
import SubCategory from '../admin/Container/SubCategory/SubCategory';
import Layout from '../admin/Component/Layout/Layout';
import Counter from '../admin/Container/Counter/Counter';
import Product from '../admin/Container/Product/Product';

function AdminRoutes(props) {
    return (
        <Layout>
            <Routes>
                <Route path={"/category"} element={<Category />} />
                <Route path={"/sub_category"} element={<SubCategory />} />
                <Route path={"/counter"} element={<Counter />} />
                <Route path={"/product"} element={<Product />} />
            </Routes>
        </Layout>
    );
}

export default AdminRoutes;