import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { number, object, string } from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, verifyOTP } from "../../redux/reducer/slice/auth.slice";
import { useNavigate } from "react-router-dom";

function Auth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(s => s.auth);
    const [type, setType] = useState("login");
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
                console.log('OTP', values);
                const res = await dispatch(verifyOTP({ email: userEmail, otp: values?.otp }))

                if (res.type == "auth/verifyOTP/fulfilled") {
                    setType('login');
                    setUserEmail('');
                }

            } else {

            }
            resetForm();
        },
    });

    console.log('user registration', type, userEmail, initialValue, validationSchema);
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
        <>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">
                    {
                        type === "login" ? "Login" :
                            type === "password" ? "Forgot Password" :
                                type === 'OTP' ? "Verify OTP" :
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
                                        type !== 'OTP' ? (
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
                                        (type === 'register' || type === 'login') ? (
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
        </>
    );
}

export default Auth;
