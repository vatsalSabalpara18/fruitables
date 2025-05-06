import React, { useContext, useEffect, useMemo, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import './cart.css'
import { decrementQty, incrementQty, removeProduct } from '../../redux/reducer/slice/cart.slice';
import { getCoupons } from '../../redux/reducer/slice/coupon.slice';
import { ThemeContext } from '../../context/ThemeProvider';

function Cart(props) {
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext)
    const [coupon, setCoupon] = useState('');
    const [couponError, setCouponError] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState({});
    const productList = useSelector(
        (state) => state.product?.products,
        shallowEqual
    );

    useEffect(() => {
        dispatch(getCoupons());
    }, [])

    const cart = useSelector((state) => state.cart.cartData);

    const couponCode = useSelector(state => state.coupon.couponCode);

    const finalCartData = cart?.map((cart_Item) => {
        const match = productList?.find((product_Item) => product_Item?._id === cart_Item?.pId);
        if (match) {
            return {
                ...match,
                qty: cart_Item?.qty
            }
        }
    })

    const sub_total = finalCartData?.reduce((acc, item) => acc + (item?.qty * item?.price), 0).toFixed(2);

    const total = useMemo(() => Object.keys(appliedCoupon).length ? parseFloat(sub_total) + 3.00 - (appliedCoupon?.discount * parseFloat(sub_total) / 100) : parseFloat(sub_total) + 3.00, [appliedCoupon, sub_total]);

    const handleApplyCoupon = () => {
        const match = couponCode.find((item) => item?.name === coupon);
        if (match) {
            setAppliedCoupon(match);
            setCouponError('');
        } else {
            setAppliedCoupon({});
            setCouponError('Invalid Coupon');
        }
    }

    return (
        <>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Cart</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Cart</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Cart Page Start */}
            <div className={`container-fluid py-5 ${theme}`}>
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    finalCartData?.length ?
                                        finalCartData?.map((cart_item) => {
                                            return (
                                                <tr key={cart_item?._id}>
                                                    <th scope="row">
                                                        <div className="d-flex align-items-center">
                                                            <img src={cart_item?.product_img?.url || "img/vegetable-item-3.png"} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt={cart_item?.product_img?.public_id} />
                                                        </div>
                                                    </th>
                                                    <td>
                                                        <p className="mb-0 mt-4">{cart_item?.name}</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 mt-4">{cart_item?.price} $</p>cart_item
                                                    </td>
                                                    <td>
                                                        <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                                            <div className="input-group-btn">
                                                                <button
                                                                    className="btn btn-sm btn-minus rounded-circle bg-light border"
                                                                    onClick={() => dispatch(decrementQty(cart_item?._id))}
                                                                    disabled={cart_item?.qty > 1 ? false : true}
                                                                >
                                                                    <i className="fa fa-minus" />
                                                                </button>
                                                            </div>
                                                            <span type="text" className="form-control form-control-sm text-center border-0" >{cart_item?.qty}</span>
                                                            <div className="input-group-btn">
                                                                <button
                                                                    className="btn btn-sm btn-plus rounded-circle bg-light border"
                                                                    onClick={() => dispatch(incrementQty(cart_item?._id))}
                                                                >
                                                                    <i className="fa fa-plus" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 mt-4">{(cart_item?.price * cart_item?.qty).toFixed(2)} $</p>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-md rounded-circle bg-light border mt-4"
                                                            onClick={() => dispatch(removeProduct(cart_item?._id))}
                                                        >
                                                            <i className="fa fa-times text-danger" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        : <tr className='no-cart'>
                                            <td colSpan={6}>No cart data available</td>
                                        </tr>
                                }
                                {/* <tr>
                                    <th scope="row">
                                        <div className="d-flex align-items-center">
                                            <img src="img/vegetable-item-5.jpg" className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                                        </div>
                                    </th>
                                    <td>
                                        <p className="mb-0 mt-4">Potatoes</p>
                                    </td>
                                    <td>
                                        <p className="mb-0 mt-4">2.99 $</p>
                                    </td>
                                    <td>
                                        <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                            <div className="input-group-btn">
                                                <button className="btn btn-sm btn-minus rounded-circle bg-light border">
                                                    <i className="fa fa-minus" />
                                                </button>
                                            </div>
                                            <input type="text" className="form-control form-control-sm text-center border-0" defaultValue={1} />
                                            <div className="input-group-btn">
                                                <button className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                    <i className="fa fa-plus" />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="mb-0 mt-4">2.99 $</p>
                                    </td>
                                    <td>
                                        <button className="btn btn-md rounded-circle bg-light border mt-4">
                                            <i className="fa fa-times text-danger" />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <div className="d-flex align-items-center">
                                            <img src="img/vegetable-item-2.jpg" className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                                        </div>
                                    </th>
                                    <td>
                                        <p className="mb-0 mt-4">Awesome Brocoli</p>
                                    </td>
                                    <td>
                                        <p className="mb-0 mt-4">2.99 $</p>
                                    </td>
                                    <td>
                                        <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                            <div className="input-group-btn">
                                                <button className="btn btn-sm btn-minus rounded-circle bg-light border">
                                                    <i className="fa fa-minus" />
                                                </button>
                                            </div>
                                            <input type="text" className="form-control form-control-sm text-center border-0" defaultValue={1} />
                                            <div className="input-group-btn">
                                                <button className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                    <i className="fa fa-plus" />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="mb-0 mt-4">2.99 $</p>
                                    </td>
                                    <td>
                                        <button className="btn btn-md rounded-circle bg-light border mt-4">
                                            <i className="fa fa-times text-danger" />
                                        </button>
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-5">
                        <input type="text" className="border-0 border-bottom rounded me-5 py-3 mb-4" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon Code" />
                        <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" onClick={handleApplyCoupon} type="button">Apply Coupon</button>
                    </div>
                    <div style={{ color: 'red' }}>{couponError ?? ""}</div>
                    <div className="row g-4 justify-content-end">
                        <div className="col-8" />
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="bg-light rounded">
                                <div className="p-4" style={{ color: 'black' }}>
                                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Subtotal:</h5>
                                        <p className="mb-0">${sub_total ?? 0}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-0 me-4">Shipping</h5>
                                        <div className>
                                            <p className="mb-0">Flat rate: $3.00</p>
                                        </div>
                                    </div>
                                    <p className="mb-0 text-end">Shipping to Ukraine.</p>
                                    {
                                        Object.keys(appliedCoupon).length > 0 && (
                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="mb-0 me-4">Discount:</h5>
                                                <p className="mb-0"> {appliedCoupon?.discount ?? 0} % oFF</p>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                                    <p className="mb-0 pe-4" style={{ color: 'black' }} >${sub_total ? total.toFixed(2) ?? 0 : 0}</p>
                                </div>
                                <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Cart Page End*/}
        </>
    );
}

export default Cart;