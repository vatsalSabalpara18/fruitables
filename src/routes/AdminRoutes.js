import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Category from '../admin/Container/Category/Category';
import SubCategory from '../admin/Container/SubCategory/SubCategory';
import Layout from '../admin/Component/Layout/Layout';

function AdminRoutes(props) {
    return (
        <Layout>
            <Routes>
                <Route path={"/category"} element={<Category />} />
                <Route path={"/sub_category"} element={<SubCategory />} />
            </Routes>
        </Layout>
    );
}

export default AdminRoutes;