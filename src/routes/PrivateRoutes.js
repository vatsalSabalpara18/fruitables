import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../component/Spinner/Spinner';
import { checkAuth } from '../redux/reducer/slice/auth.slice';

function PrivateRoutes(props) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const auth = useSelector(s => s.auth);
    console.log(auth, 'Auth');
    // const auth = true
    const fetchAuthentication = async () => {
        try {
            await dispatch(checkAuth())
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }
    useEffect(() => {
        fetchAuthentication();
    }, [])
    if (loading) {
        return <Spinner />
    }
    return (
        auth?.isValid ? <Outlet /> : <Navigate to={"/"} replace={true} />
    );
}

export default PrivateRoutes;