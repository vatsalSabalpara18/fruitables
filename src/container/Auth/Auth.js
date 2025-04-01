import React, { useState } from "react";
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../redux/reducer/slice/auth.slice";
import { useNavigate } from "react-router-dom";

function Auth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(s => s.auth);
    const [type, setType] = useState("login");

    let initialValue = {}, validationSchema = {};

    if (type === 'login') {
        initialValue = {
            email: '',
            password: ''
        }
        validationSchema = {
            email: string().email().required(),
            password: string().required(),
        }
    } else if (type === 'register') {
        initialValue = {
            name: '',
            email: '',
            password: ''
        }

        validationSchema = {
            name: string().required(),
            email: string().email().required(),
            password: string().required(),
        }

    } else {
        initialValue = {
            email: ''
        }

        validationSchema = {
            email: string().email().required(),
        }
    }

    const userSchema = object(validationSchema);

    const formik = useFormik({
        initialValues: initialValue,
        enableReinitialize: true,
        validationSchema: userSchema,
        onSubmit: (values, { resetForm }) => {
            // alert(JSON.stringify(values, null, 2));
            if (type === 'login') {
                dispatch(loginUser(values));
            } else if (type === 'register') {
                dispatch(registerUser({ ...values, role: 'user' }));
            } else {

            }
            resetForm();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues, resetForm, setFieldValue } = formik;

    if(auth.isValid){
        navigate('/');
    }

    return (
        <>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">
                    {
                        type === "login" ? "Login" :
                            type === "password" ? "Forgot Password" :
                                "Register"
                    }
                </h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href="#">Pages</a>
                    </li>
                    <li className="breadcrumb-item active text-white">
                        {
                            type === "login" ? "Login" :
                                type === "password" ? "Forgot Password" :
                                    "Register"
                        }
                    </li>
                </ol>
            </div>

            {/* <!-- auth Start --> */}
            <div className="container-fluid contact py-5">
                <div className="container py-5">
                    <div className="p-5 bg-light rounded">
                        <div className="row g-4">
                            <div className="col-lg-7">
                                <form action='' onSubmit={handleSubmit}>
                                    {
                                        type === "register" ? (
                                            <>
                                                <input
                                                    type="text"
                                                    className="w-100 form-control border-0 py-3 mb-4"
                                                    placeholder="Your Name"
                                                    name="name"
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <span>
                                                    {
                                                        errors.name && touched.name ? errors.name : null
                                                    }
                                                </span>
                                            </>
                                        ) : null
                                    }
                                    <input
                                        type="email"
                                        className="w-100 form-control border-0 py-3 mb-4"
                                        placeholder="Enter Your Email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <span>
                                        {
                                            errors.email && touched.email ? errors.email : null
                                        }
                                    </span>
                                    {
                                        type !== "password" ? (
                                            <>
                                                <input
                                                    type="password"
                                                    className="w-100 form-control border-0 py-3 mb-4"
                                                    placeholder="Enter Your Password"
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <span>
                                                    {
                                                        errors.password && touched.password ? errors.password : null
                                                    }
                                                </span>
                                            </>
                                        ) : null
                                    }
                                    <button
                                        className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                                        type="submit"
                                    >
                                        {
                                            type === "login" ? "Login" :
                                                type === "password" ? "Submit" :
                                                    "Register"
                                        }
                                    </button>
                                </form>
                                <div className="text-center mt-3">
                                    {
                                        type === 'login' ? <>
                                            <a href="#" onClick={() => setType('password')}>Forgot password?</a>
                                            <br />
                                            <span>Create an account: </span>
                                            <a href="#" onClick={() => setType('register')}>SignUp</a>
                                        </> : null
                                    }
                                    {
                                        (type === 'register' || type === 'password') ? <>
                                            <span>Already have account: </span>
                                            <a href="#" onClick={() => setType('login')}>LogIn</a>
                                        </> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- AUTH End --> */}
        </>
    );
}

export default Auth;
