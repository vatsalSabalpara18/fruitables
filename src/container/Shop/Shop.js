import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../redux/reducer/slice/product.slice";
import { getCategories } from "../../redux/reducer/slice/category.slice";
import { getSubCategories } from "../../redux/reducer/slice/subcategory.slice";
import { IMAGE_URL } from "../../utills/baseURL";
import "../../assets/css/product.css";
import { useDebouncedCallback } from "use-debounce";
import { Slider } from "@mui/material";

function Shop(props) {
    const { id } = useParams();
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.product?.products);
    const categoryList = useSelector((state) => state?.category?.categories);
    const subCategoryList = useSelector(
        (state) => state?.subcategory?.subCategoryData
    );
    const [priceRange, setPriceRange] = useState(0);
    const [currentCategory, setCurrentCategory] = useState("");
    const [selectedOption, setSelectedOption] = useState('Name(A-Z)');
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategories());
        dispatch(getSubCategories());
    }, []);

    const handleProductDisplay = () => {
        let finalProductList;
        // subcategories        
        if (id) {
            finalProductList = productList?.filter((item) => item?.sub_category === id);
        } else {
            finalProductList = [...productList];
        }
        
        // categories
        if (currentCategory === "All Categories") {
            finalProductList = [...productList];
        } else if (currentCategory) {
            finalProductList = productList?.filter((item) => item?.category === currentCategory)
        }

        //priceRange
        if (priceRange > 0) {
            finalProductList = finalProductList?.filter((item) => item?.price <= priceRange)
        }

        // sorting
        if (selectedOption === "Name(A-Z)") {
            finalProductList?.sort((a, b) => a?.name?.localeCompare(b?.name));
        } else if (selectedOption === "Name(Z-A)") {
            finalProductList?.sort((a, b) => b?.name.localeCompare(a?.name));
        } else if (selectedOption === "PLH") {
            finalProductList?.sort((a, b) => a?.price - b?.price);
        } else if (selectedOption === "PHL") {
            finalProductList?.sort((a, b) => b?.price - a?.price);
        }

        // searching
        if (searchQuery) {
            finalProductList = finalProductList?.filter(
                (item) =>
                    item?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item?.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item?.price.toString().includes(searchQuery)
            );
        }

        return finalProductList;
    }

    const productData = handleProductDisplay();

    useEffect(() => {
        // if (id) {
        //     setProductData(
        //         productList?.filter((item) => item?.sub_category === id)              
        //     );
        // } else {
        //     setProductData(productList);
        // }
        // handleProductDisplay()
    }, [id, productList?.length]);

    const handlePriceChange = useDebouncedCallback((value) => {
        setPriceRange(value)
        handleProductDisplay()
        //     if (prevState.length && value > 0) {
        //     } else {
        //         return productList?.filter((item) => {
        //             const categoryName = categoryList?.find((cat_Item) => cat_Item?._id === item?.category)?.name
        //             return categoryName === currentCategory
        //         })
        //     }
        // }
    }, 100)

    return (
        <>
            {/* <!-- Spinner Start -->
            <div id="spinner" class="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center">
                <div class="spinner-grow text-primary" role="status"></div>
            </div>
            <!-- Spinner End --> */}

            <div>
                {/* Single Page Header start */}
                <div className="container-fluid page-header py-5">
                    <h1 className="text-center text-white display-6">Shop</h1>
                    <ol className="breadcrumb justify-content-center mb-0">
                        <li className="breadcrumb-item">
                            <a href="#">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="#">Pages</a>
                        </li>
                        <li className="breadcrumb-item active text-white">Shop</li>
                    </ol>
                </div>
                {/* Single Page Header End */}
                {/* Fruits Shop Start*/}
                <div className="container-fluid fruite py-5">
                    <div className="container py-5">
                        <h1 className="mb-4">Fresh fruits shop</h1>
                        <div className="row g-4">
                            <div className="col-lg-12">
                                <div className="row g-4">
                                    <div className="col-xl-3">
                                        <div className="input-group w-100 mx-auto d-flex">
                                            <input
                                                type="search"
                                                className="form-control p-3"
                                                placeholder="keywords"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                aria-describedby="search-icon-1"
                                            />
                                            <span id="search-icon-1" className="input-group-text p-3">
                                                <i className="fa fa-search" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-6" />
                                    <div className="col-xl-3">
                                        <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                            <label htmlFor="fruits">Default Sorting:</label>
                                            <select
                                                id="fruits"
                                                name="fruitlist"
                                                className="border-0 form-select-sm bg-light me-3"
                                                form="fruitform"
                                                value={selectedOption}
                                                onChange={(e) => setSelectedOption(e.target.value)}
                                            >
                                                <option value="Name(A-Z)">Name(A-Z)</option>
                                                <option value="Name(Z-A)">Name(Z-A)</option>
                                                <option value="PLH">Price(Low-High)</option>
                                                <option value="PHL">Priec(High-Low)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-4">
                                    <div className="col-lg-3">
                                        <div className="row g-4">
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <h4>Categories</h4>
                                                    <ul className="list-unstyled fruite-categorie">
                                                        <li>
                                                            <div className="d-flex justify-content-between fruite-name">
                                                                <span
                                                                    style={{ cursor: "pointer" }}
                                                                    className={
                                                                        currentCategory === 'All Categories'
                                                                            ? "active"
                                                                            : ""
                                                                    }
                                                                    onClick={() => {
                                                                        setCurrentCategory("All Categories");
                                                                        handleProductDisplay();
                                                                    }}
                                                                >
                                                                    All Categories
                                                                </span>
                                                                <span>{productList?.length}</span>
                                                            </div>
                                                        </li>
                                                        {categoryList?.map((item) => {
                                                            const productByCategory = productList?.filter(
                                                                (product_Item) =>
                                                                    product_Item?.category === item?._id
                                                            );
                                                            return (
                                                                <li key={item?._id}>
                                                                    <div className="d-flex justify-content-between fruite-name">
                                                                        <span
                                                                            style={{ cursor: "pointer" }}
                                                                            className={
                                                                                currentCategory === item?._id
                                                                                    ? "active"
                                                                                    : ""
                                                                            }
                                                                            onClick={() => {
                                                                                setCurrentCategory(item?._id);
                                                                                handlePriceChange();
                                                                            }}
                                                                        >
                                                                            {item?.name}
                                                                        </span>
                                                                        <span>{productByCategory?.length}</span>
                                                                    </div>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <h4 className="mb-2">Price</h4>
                                                    {/* <input
                                                        type="range"
                                                        className="form-range w-100"
                                                        id="rangeInput"
                                                        name="rangeInput"
                                                        min={0}
                                                        max={500}
                                                        value={priceRange}
                                                        onInput={(e) => handlePriceChange(+e.target.value)}  
                                                    /> */}
                                                    <Slider
                                                        className="form-range w-100"
                                                        size="small"
                                                        min={1}
                                                        max={500}
                                                        value={priceRange}
                                                        onChange={(e) => handlePriceChange(+e.target.value)}
                                                        aria-label="Small"
                                                        valueLabelDisplay="auto"
                                                    />
                                                    <output
                                                        id="amount"
                                                        name="amount"
                                                        min-velue={1}
                                                        max-value={500}
                                                        htmlFor="rangeInput"
                                                    >
                                                        {priceRange}
                                                    </output>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <h4>Additional</h4>
                                                    <div className="mb-2">
                                                        <input
                                                            type="radio"
                                                            className="me-2"
                                                            id="Categories-1"
                                                            name="Categories-1"
                                                            defaultValue="Beverages"
                                                        />
                                                        <label htmlFor="Categories-1"> Organic</label>
                                                    </div>
                                                    <div className="mb-2">
                                                        <input
                                                            type="radio"
                                                            className="me-2"
                                                            id="Categories-2"
                                                            name="Categories-1"
                                                            defaultValue="Beverages"
                                                        />
                                                        <label htmlFor="Categories-2"> Fresh</label>
                                                    </div>
                                                    <div className="mb-2">
                                                        <input
                                                            type="radio"
                                                            className="me-2"
                                                            id="Categories-3"
                                                            name="Categories-1"
                                                            defaultValue="Beverages"
                                                        />
                                                        <label htmlFor="Categories-3"> Sales</label>
                                                    </div>
                                                    <div className="mb-2">
                                                        <input
                                                            type="radio"
                                                            className="me-2"
                                                            id="Categories-4"
                                                            name="Categories-1"
                                                            defaultValue="Beverages"
                                                        />
                                                        <label htmlFor="Categories-4"> Discount</label>
                                                    </div>
                                                    <div className="mb-2">
                                                        <input
                                                            type="radio"
                                                            className="me-2"
                                                            id="Categories-5"
                                                            name="Categories-1"
                                                            defaultValue="Beverages"
                                                        />
                                                        <label htmlFor="Categories-5"> Expired</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <h4 className="mb-3">Featured products</h4>
                                                <div className="d-flex align-items-center justify-content-start">
                                                    <div
                                                        className="rounded me-4"
                                                        style={{ width: 100, height: 100 }}
                                                    >
                                                        <img
                                                            src="img/featur-1.jpg"
                                                            className="img-fluid rounded"
                                                            alt
                                                        />
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-2">Big Banana</h6>
                                                        <div className="d-flex mb-2">
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star" />
                                                        </div>
                                                        <div className="d-flex mb-2">
                                                            <h5 className="fw-bold me-2">2.99 $</h5>
                                                            <h5 className="text-danger text-decoration-line-through">
                                                                4.11 $
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-start">
                                                    <div
                                                        className="rounded me-4"
                                                        style={{ width: 100, height: 100 }}
                                                    >
                                                        <img
                                                            src="img/featur-2.jpg"
                                                            className="img-fluid rounded"
                                                            alt
                                                        />
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-2">Big Banana</h6>
                                                        <div className="d-flex mb-2">
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star" />
                                                        </div>
                                                        <div className="d-flex mb-2">
                                                            <h5 className="fw-bold me-2">2.99 $</h5>
                                                            <h5 className="text-danger text-decoration-line-through">
                                                                4.11 $
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-start">
                                                    <div
                                                        className="rounded me-4"
                                                        style={{ width: 100, height: 100 }}
                                                    >
                                                        <img
                                                            src="img/featur-3.jpg"
                                                            className="img-fluid rounded"
                                                            alt
                                                        />
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-2">Big Banana</h6>
                                                        <div className="d-flex mb-2">
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star" />
                                                        </div>
                                                        <div className="d-flex mb-2">
                                                            <h5 className="fw-bold me-2">2.99 $</h5>
                                                            <h5 className="text-danger text-decoration-line-through">
                                                                4.11 $
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center my-4">
                                                    <a
                                                        href="#"
                                                        className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100"
                                                    >
                                                        Vew More
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="position-relative">
                                                    <img
                                                        src="img/banner-fruits.jpg"
                                                        className="img-fluid w-100 rounded"
                                                        alt
                                                    />
                                                    <div
                                                        className="position-absolute"
                                                        style={{
                                                            top: "50%",
                                                            right: 10,
                                                            transform: "translateY(-50%)",
                                                        }}
                                                    >
                                                        <h3 className="text-secondary fw-bold">
                                                            Fresh <br /> Fruits <br /> Banner
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="row g-4 justify-content-center">
                                            {productData?.length ? productData?.map((product_Item) => {
                                                {
                                                    /* const categoryName = categoryList?.find((item) => item?._id === product_Item?.category)?.name; */
                                                }
                                                const subCategoryName = subCategoryList?.find(
                                                    (item) => item?._id === product_Item?.sub_category
                                                )?.name;

                                                return (
                                                    <div
                                                        className="col-md-6 col-lg-6 col-xl-4"
                                                        key={product_Item?._id}
                                                    >
                                                        <div className="rounded position-relative fruite-item">
                                                            <div className="fruite-img">
                                                                <img
                                                                    src={IMAGE_URL + product_Item?.product_img}
                                                                    className="img-fluid w-100 rounded-top product_img"
                                                                    alt={product_Item?.name}
                                                                />
                                                            </div>
                                                            <div
                                                                className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                                                                style={{ top: 10, left: 10 }}
                                                            >
                                                                {subCategoryName}
                                                            </div>
                                                            <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                                <h4>{product_Item?.name}</h4>
                                                                <p>
                                                                    {product_Item?.description?.slice(0, 70)}...
                                                                </p>
                                                                <div className="d-flex justify-content-between flex-lg-wrap">
                                                                    <p className="text-dark fs-5 fw-bold mb-0">
                                                                        $ {product_Item?.price}
                                                                    </p>
                                                                    <a
                                                                        href="#"
                                                                        className="btn border border-secondary rounded-pill px-3 text-primary"
                                                                    >
                                                                        <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                                                                        Add to cart
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                                : <span className="no-product">No Products Found!</span>}
                                            <div className="col-12">
                                                <div className="pagination d-flex justify-content-center mt-5">
                                                    <a href="#" className="rounded">
                                                        «
                                                    </a>
                                                    <a href="#" className="active rounded">
                                                        1
                                                    </a>
                                                    <a href="#" className="rounded">
                                                        2
                                                    </a>
                                                    <a href="#" className="rounded">
                                                        3
                                                    </a>
                                                    <a href="#" className="rounded">
                                                        4
                                                    </a>
                                                    <a href="#" className="rounded">
                                                        5
                                                    </a>
                                                    <a href="#" className="rounded">
                                                        6
                                                    </a>
                                                    <a href="#" className="rounded">
                                                        »
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Fruits Shop End*/}
            </div>
        </>
    );
}

export default Shop;
