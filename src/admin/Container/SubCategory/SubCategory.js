import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, FormControl, FormHelperText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { mixed, number, object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addSubCategories, deleteCategories, getSubCategories, updateCategories } from '../../../redux/reducer/slice/subcategory.slice';
import { API_BASE_URL, IMAGE_URL } from '../../../utills/baseURL';
import { ThemeContext } from '../../../context/ThemeProvider';
import { getCategories } from '../../../redux/reducer/slice/category.slice';
import { useContext } from 'react';

function SubCategory(props) {
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);
    const [open, setOpen] = React.useState(false);
    const [isUpdate, setIsUpdate] = React.useState(false);

    const subCategory = useSelector(state => state.subcategory);
    const categoryList = useSelector(state => state.category.categories);

    const getCategoryList = async () => {
        dispatch(getCategories());
    }

    const handleDelete = (id) => {        
        dispatch(deleteCategories(id))
    }

    const handleEdit = (data) => {
        handleClickOpen();
        setValues(data)
        setIsUpdate(true)
    }

    const columns = [
        {
            field: 'sub_cat_img',
            headerName: 'Sub Category Image',
            width: 150,
            renderCell: (params) => {
               return (
                    <img
                       src={IMAGE_URL + params.row.sub_cat_img}
                       alt={params.row.sub_cat_img}
                        height={50}
                        width={50}
                    />
                )
            }
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 130,
            valueGetter: (value) => {
                return categoryList.find(item => item._id === value)?.name;
            }
        },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 230 },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <strong>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
                        <GridDeleteIcon />
                    </IconButton>
                </strong>
            ),
        },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    const getSubCategoryList = () => {
        dispatch(getSubCategories());
    }

    React.useEffect(() => {
        getCategoryList();
        getSubCategoryList();
    }, []);

    const SubCategorySchema = object({
        category: string().required(),
        name: string().required(),
        description: string().required(),
        sub_cat_img: mixed()
            .required("You need provide the file.")
            .test("profile", "The file is too large", (value) => {
                if (typeof value === "string") {
                    return true
                } else if (typeof value === "object") {
                    return value && value.size <= 2000000;
                }
            })
            .test(
                "profile",
                "only the following formats are allowed: jpeg, jpg & png",
                (value) => {
                    if (typeof value === "string") {
                        return true
                    } else if (typeof value === "object") {
                        return (
                            value && (value.type === "image/jpeg" || value.type === "image/png")
                        );
                    }
                }
            ),
    });

    const AddSubCategory = (values) => {
        // const id = +new Date;
        dispatch(addSubCategories(values));
    }

    const UpdateSubCategory = (values) => {
        dispatch(updateCategories(values))
    }

    const formik = useFormik({
        initialValues: {
            category: 0,
            name: '',
            description: '',
            sub_cat_img: ''
        },
        validationSchema: SubCategorySchema,
        onSubmit: (values, { resetForm }) => {              
            if (isUpdate) {
                UpdateSubCategory(values)
            } else {
                AddSubCategory(values);
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues, resetForm, setFieldValue } = formik;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsUpdate(false)
        resetForm()
    };
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>Sub Category</h1>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Sub Category
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <form onSubmit={handleSubmit} enctype="multipart/form-data">
                        <DialogTitle>Sub Category</DialogTitle>
                        <DialogContent>
                            <InputLabel id="demo-simple-select-standard-label">category</InputLabel>
                            <FormControl fullWidth error={errors.category && touched.category ? errors.category : ''}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={values.category}
                                    onChange={handleChange}
                                    label="Age"
                                    fullWidth
                                    variant='standard'
                                    error={errors.category && touched.category}
                                    onBlur={handleBlur}
                                    name="category"
                                >
                                    <MenuItem value="0">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        categoryList.map((item) => {
                                            return <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                        })
                                    }
                                </Select>
                                <FormHelperText>{errors.category && touched.category ? errors.category : ''}</FormHelperText>
                            </FormControl>
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={values.name}
                                onChange={handleChange}
                                error={errors.name && touched.name}
                                helperText={errors.name && touched.name ? errors.name : ''}
                                onBlur={handleBlur}
                            />
                            <TextField
                                margin="dense"
                                id="description"
                                name="description"
                                label="Description"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={values.description}
                                onChange={handleChange}
                                error={errors.description && touched.description}
                                helperText={errors.description && touched.description ? errors.description : ''}
                                onBlur={handleBlur}
                            />
                            <div>
                                <label htmlFor="sub_cat_img">sub_category_img: </label>
                                <input
                                    id="sub_cat_img"
                                    type="file"
                                    name="sub_cat_img"
                                    style={{ marginLeft: "10px" }}
                                    onChange={(e) =>
                                        setFieldValue("sub_cat_img", e.target.files[0])
                                    }
                                />
                                <img
                                    src={
                                        typeof values?.sub_cat_img === "string"
                                            ? IMAGE_URL + values?.sub_cat_img
                                            : values.sub_cat_img !== null ? URL.createObjectURL(values.sub_cat_img) : 'img/avatar.jpg'
                                        // :  URL.createObjectURL(values.cat_img)
                                    }
                                    height={"100"}
                                    width={"100"}
                                />
                                {errors.sub_cat_img && touched.sub_cat_img ? (
                                    <p style={{ color: "red", fontSize: "small" }}>
                                        {errors.sub_cat_img}
                                    </p>
                                ) : null}
                            </div>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">{isUpdate ? "Update" : "Submit"}</Button>
                            </DialogActions>
                        </DialogContent>

                    </form>
                </Dialog>
            </Box>
            <Box>
                <Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={subCategory.subCategoryData}
                        columns={columns}
                        getRowId={(row) => row._id}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        sx={{ border: 0 }}
                    />
                </Paper>
            </Box>
        </Box>
    );
}

export default SubCategory;