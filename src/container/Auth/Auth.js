import React, { useContext, useEffect, useState } from "react";
import { useFormik } from 'formik';
import { number, object, ref, string } from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, loginUser, registerUser, resetPassword, verifyOTP } from "../../redux/reducer/slice/auth.slice";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeProvider";

function Auth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext)
    const auth = useSelector(s => s.auth);
    const [type, setType] = useState("login");
    const [typeIsPass, setTypeIsPass] = useState(false);
    const [userEmail, setUserEmail] = useState('');

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

    } else if (type === 'OTP') {
        initialValue = {
            otp: ''
        }

        validationSchema = {
            otp: number().required()
        }

    } else if (type === 'conform_password') {
        initialValue = {
            password: '',
            conform_password: ''
        }

        validationSchema = {
            password: number().required(),
            conform_password: number().required().oneOf([ref('password')], "password must match")
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
        onSubmit: async (values, { resetForm }) => {
            // alert(JSON.stringify(values, null, 2));
            if (type === 'login') {
                dispatch(loginUser(values));

            } else if (type === 'register') {
                const res = await dispatch(registerUser({ ...values, role: 'user' }));
                console.log("res", res);

                if (res.type == "auth/registerUser/fulfilled") {
                    setType('OTP');
                    setUserEmail(values?.email);
                }
            } else if (type === 'OTP') {                
                const res = await dispatch(verifyOTP({ email: userEmail, otp: values?.otp }))

                if (res.type == "auth/verifyOTP/fulfilled") {
                    if(typeIsPass){
                        setType('conform_password')
                    } else {
                        setType('login');
                        setUserEmail('');
                    }
                }

            } else if(type == 'password'){
                const res = await dispatch(forgotPassword(values))

                if (res.type === 'auth/forgotPassword/fulfilled'){
                    setType('OTP');
                    setTypeIsPass(true);                
                    localStorage.setItem('userEmail', values?.email);
                    setUserEmail(values?.email);
                }
            } else if (type == "conform_password"){
                const res = await dispatch(resetPassword({password: values?.password, email: userEmail}))

                if (res.type == "auth/resetPassword/fulfilled"){
                    setType('login');
                    setTypeIsPass(false);
                    localStorage.removeItem('userEmail');
                    setUserEmail('');
                }
            }
            resetForm();
        },
    });
    
    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues, resetForm, setFieldValue } = formik;

    if (auth.isValid) {
        navigate('/');
    }

    const googleLogin = () => {
        try {
            window.location.href = 'http://localhost:8081/api/v1/user/google';
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');

        if (userEmail) {
            setType('OTP');
            setUserEmail(userEmail);
        }
    }, []);

    return (
        <div className={theme}>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">
                    {
                        type === "login" ? "Login" :
                            type === "password" ? "Forgot Password" :
                                type === 'OTP' ? "Verify OTP" :
                                    type === 'conform_password' ? "Password Conformation" :                                
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
                                    type === 'OTP' ? "Verify OTP" :
                                        type === 'conform_password' ? "Password Conformation" :
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
                                    {
                                        type == 'register' || type == "login" || type == 'password' ? (
                                            <>
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
                                            </>
                                        ) : null
                                    }
                                    {
                                        (type === 'register' || type === 'login' || type === 'conform_password') ? (
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
                                    {
                                        type === 'conform_password' ? (
                                            <>
                                                <input
                                                    type="password"
                                                    className="w-100 form-control border-0 py-3 mb-4"
                                                    placeholder="Enter Your Password"
                                                    name="conform_password"
                                                    value={values.conform_password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <span>
                                                    {
                                                        errors.conform_password && touched.conform_password ? errors.conform_password : null
                                                    }
                                                </span>
                                            </>
                                        ) : null
                                    }
                                    {
                                        type === 'OTP' ? (
                                            <>
                                                <input
                                                    type="text"
                                                    className="w-100 form-control border-0 py-3 mb-4"
                                                    placeholder="Enter Your OTP"
                                                    name="otp"
                                                    value={values.otp}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <span>
                                                    {
                                                        errors.otp && touched.otp ? errors.otp : null
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
                                                    type === 'OTP' ? "Verify OTP" :
                                                        type === 'conform_password' ? "Create Password" :
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
                                <div>
                                    <button
                                        className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                                        onClick={googleLogin}
                                    >
                                        Sign In with Google
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- AUTH End --> */}
        </div>
    );
}

export default Auth;
