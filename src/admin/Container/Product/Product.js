import { useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    FormControl,
    Select,
    MenuItem,
    FormHelperText,
    InputLabel,
    DialogContentText,
} from "@mui/material";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { object, string, mixed, number } from "yup";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_URL } from "../../../utills/baseURL";
import {
    addProduct,
    deleteProduct,
    getProducts,
    updateProduct,
} from "../../../redux/reducer/slice/product.slice";
import { getCategories } from "../../../redux/reducer/slice/category.slice";
import { getSubCategories, getSubCategoryByCategory } from "../../../redux/reducer/slice/subcategory.slice";

const paginationModel = { page: 0, pageSize: 5 };

function Product(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(null);
    const product = useSelector((state) => state.product);
    const categoryList = useSelector((state) => state.category?.categories);
    const subCategoryDataList = useSelector(
        (state) => state.subcategory?.subCategoryData
    );
    const { subCatByCat } = useSelector((state) => state.subcategory);
    const [isUpdate, setIsUpdate] = React.useState(false);

    const handleDeleteModel = (row_id) => {
        setDeleteId(row_id);
        setOpenDelete(!openDelete);
    }

    const getProductData = () => {
        dispatch(getProducts());
        dispatch(getSubCategories());
    };

    const getCategoryList = async () => {
        dispatch(getCategories());
    };

    const productSchema = object({
        category: string().required(),
        sub_category: string().required(),
        name: string().required(),
        price: number().required(),
        description: string().required(),
        product_img: mixed()
            .required("You need provide the file.")
            .test("profile", "The file is too large", (value) => {
                if (typeof value === "string") {
                    return true;
                } else if (typeof value === "object") {
                    return value && value.size <= 2000000;
                }
            })
            .test(
                "profile",
                "only the following formats are allowed: jpeg, jpg & png",
                (value) => {
                    if (typeof value === "string") {
                        return true;
                    } else if (typeof value === "object") {
                        return (
                            value &&
                            (value.type === "image/jpeg" || value.type === "image/png")
                        );
                    }
                }
            ),
    });

    const formik = useFormik({
        initialValues: {
            category: "",
            sub_category: "",
            name: "",
            description: "",
            product_img: "",
            price: "",
        },
        validationSchema: productSchema,
        onSubmit: (values, { resetForm }) => {
            // alert(JSON.stringify(values, null, 2));
            if (isUpdate) {
                dispatch(updateProduct(values));
            } else {
                dispatch(addProduct(values));
            }
            resetForm();
            handleClose();
        },
    });

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        setValues,
        resetForm,
        setFieldValue,
    } = formik;    

    useEffect(() => {        
        dispatch(getSubCategoryByCategory(values?.category));
    }, [values?.category]);

    useEffect(() => {
        getProductData();
        getCategoryList();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    const handleEdit = (data) => {
        handleClickOpen();
        // setIsEdit(index);
        setIsUpdate(true);
        setValues(data);
    };

    const columns = [
        {
            field: "product_img",
            headerName: "product Image",
            width: 120,
            renderCell: (params) => (
                <img
                    src={IMAGE_URL + params.row.product_img}
                    alt={params.row.product_img}
                    height={50}
                    width={50}
                />
            ),
        },
        {
            field: "category",
            headerName: "Category",
            width: 150,
            valueGetter: (value) => {
                return categoryList.find((item) => item._id === value)?.name;
            },
        },
        {
            field: "sub_category",
            headerName: "Sub-Category",
            width: 150,
            valueGetter: (value) => {
                return subCategoryDataList?.find((item) => item._id === value)?.name;
            },
        },
        { field: "name", headerName: "Name", width: 150 },
        { field: "description", headerName: "Description", width: 250 },
        { field: "price", headerName: "price", width: 150 },
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => (
                <strong>
                    <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteModel(params.row?._id)}
                    >
                        <GridDeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </strong>
            ),
        },
    ];

    const handleClose = () => {
        setOpen(false);
        resetForm();
        // setIsEdit(null);
        setIsUpdate(false);
    };

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Product</h1>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Product
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <form onSubmit={handleSubmit} enctype="multipart/form-data">
                        <DialogTitle>Product</DialogTitle>
                        <DialogContent>
                            <InputLabel id="demo-simple-select-standard-label">
                                category
                            </InputLabel>
                            <FormControl
                                fullWidth
                                error={
                                    errors.category && touched.category ? errors.category : ""
                                }
                            >
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={values.category}
                                    onChange={handleChange}
                                    label="category"
                                    fullWidth
                                    variant="standard"
                                    error={errors.category && touched.category}
                                    onBlur={handleBlur}
                                    name="category"
                                >
                                    <MenuItem value="0">
                                        <em>None</em>
                                    </MenuItem>
                                    {categoryList.map((item) => {
                                        return (
                                            <MenuItem key={item._id} value={item._id}>
                                                {item.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>
                                    {errors.category && touched.category ? errors.category : ""}
                                </FormHelperText>
                            </FormControl>
                            <InputLabel id="demo-simple-select-standard-label">
                                sub category
                            </InputLabel>
                            <FormControl
                                fullWidth
                                error={
                                    errors.sub_category && touched.sub_category
                                        ? errors.sub_category
                                        : ""
                                }
                            >
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={values.sub_category}
                                    onChange={handleChange}
                                    label="sub_category"
                                    fullWidth
                                    variant="standard"
                                    error={errors.sub_category && touched.sub_category}
                                    onBlur={handleBlur}
                                    name="sub_category"
                                >
                                    <MenuItem value="0">
                                        <em>None</em>
                                    </MenuItem>
                                    {subCatByCat?.map((item) => {
                                        return (
                                            <MenuItem key={item._id} value={item._id}>
                                                {item.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>
                                    {errors.sub_category && touched.sub_category
                                        ? errors.sub_category
                                        : ""}
                                </FormHelperText>
                            </FormControl>
                            <TextField
                                onBlur={handleBlur}
                                margin="dense"
                                id="name"
                                name="name"
                                label="name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                value={values.name}
                                error={errors.name && touched.name}
                                helperText={errors.name && touched.name ? errors.name : ""}
                            />
                            <TextField
                                margin="dense"
                                id="description"
                                name="description"
                                label="description"
                                type="text"
                                fullWidth
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.description}
                                error={errors.description && touched.description}
                                helperText={
                                    errors.description && touched.description
                                        ? errors.description
                                        : ""
                                }
                            />
                            <TextField
                                margin="dense"
                                id="price"
                                name="price"
                                label="price"
                                type="text"
                                fullWidth
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.price}
                                error={errors.price && touched.price}
                                helperText={errors.price && touched.price ? errors.price : ""}
                            />
                            <div>
                                <label htmlFor="profile">Product_Img: </label>
                                <input
                                    id="product_img"
                                    type="file"
                                    name="product_img"
                                    style={{ marginLeft: "10px" }}
                                    onChange={(e) =>
                                        setFieldValue("product_img", e.target.files[0])
                                    }
                                />
                                <img
                                    src={
                                        typeof values?.product_img === "string"
                                            ? IMAGE_URL + values?.product_img
                                            : values?.product_img !== null
                                                ? URL.createObjectURL(values.product_img)
                                                : "img/avatar.jpg"
                                        // :  URL.createObjectURL(values.product_img)
                                    }
                                    height={"100"}
                                    width={"100"}
                                />
                                {errors.product_img && touched.product_img ? (
                                    <p style={{ color: "red", fontSize: "small" }}>
                                        {errors.product_img}
                                    </p>
                                ) : null}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            {/* (isEdit || isEdit === 0) ? "Update" : "Submit" */}
                            <Button type="submit">{isUpdate ? "Update" : "Submit"}</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>
            <Box sx={{ mt: 5 }}>
                <Paper sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                        rows={product?.products}
                        getRowId={(row) => row._id}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        sx={{ border: 0 }}
                    />
                </Paper>
            </Box>
            <React.Fragment>                
                <Dialog
                    open={openDelete}
                    onClose={() => handleDeleteModel(null)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Delete Product
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure delete Product?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleDeleteModel(null)}>No</Button>
                        <Button onClick={() => {
                            if(deleteId) {
                                handleDelete(deleteId);
                            }
                            handleDeleteModel(null);
                        }} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </Box>
    );
}

export default Product;
