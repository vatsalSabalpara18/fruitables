import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Category from '../admin/Container/Category/Category';
import SubCategory from '../admin/Container/SubCategory/SubCategory';

function AdminRoutes(props) {
    return (
        <>
            <Routes>
                <Route path={"/category"} element={<Category />} />
                <Route path={"/sub_category"} element={<SubCategory />} />
            </Routes>
        </>
    );
}

export default AdminRoutes;