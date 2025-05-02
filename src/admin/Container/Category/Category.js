// import * as React from 'react';
import { useEffect } from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { object, string, mixed } from 'yup';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, deleteCategories, getCategories, updateCategory } from '../../../redux/reducer/slice/category.slice';
import { IMAGE_URL } from '../../../utills/baseURL';

const paginationModel = { page: 0, pageSize: 5 };

function Category(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [categoryTable, setCategoryTable] = React.useState([]);
    // const [isEdit, setIsEdit] = React.useState(null);
    const category = useSelector(state => state.category);
    const [isUpdate, setIsUpdate] = React.useState(false);

    const getCategoryData = () => {
        dispatch(getCategories());
    }

    useEffect(() => {
        getCategoryData();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteCategories(id));
    }

    const handleEdit = (data) => {
        handleClickOpen();
        // setIsEdit(index);        
        setIsUpdate(true);
        setValues(data);
    }

    const columns = [
        {
            field: 'cat_img',
            headerName: 'Category Image',
            width: 150,
            renderCell: (params) => (
                <img
                    src={params.row.cat_img?.url}
                    alt={params.row.cat_img?.url}
                    height={50}
                    width={50}
                />
            )

        },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 450 },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <strong>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row?._id)}>
                        <GridDeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </strong>
            ),
        },
    ];

    const categorySchema = object({
        name: string().required(),
        description: string().required(),
        cat_img: mixed()
            .required("You need provide the file.")
            .test("profile", "The file is too large", (value) => {                
                if (typeof value === "string" || typeof value?.url === "string") {
                    return true
                } else if (typeof value === "object") {
                    return value && value.size <= 2000000;
                }
            })
            .test(
                "profile",
                "only the following formats are allowed: jpeg, jpg & png",
                (value) => {
                    if (typeof value === "string" || typeof value?.url === "string") {
                        return true
                    } else if (typeof value === "object") {
                        return (
                            value && (value.type === "image/jpeg" || value.type === "image/png")
                        );
                    }
                }
            ),
    })

    const addCategory = (values) => {
        dispatch(createCategory(values));
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            cat_img: '',
        },
        validationSchema: categorySchema,
        onSubmit: (values, { resetForm }) => {
            // alert(JSON.stringify(values, null, 2));            
            if (isUpdate) {
                dispatch(updateCategory(values));
            } else {
                addCategory(values);
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues, resetForm, setFieldValue } = formik;

    const handleClose = () => {
        setOpen(false);
        resetForm();
        // setIsEdit(null);  
        setIsUpdate(false);
    };


    return (
        <Box >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>Category</h1>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Category
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <form onSubmit={handleSubmit} enctype="multipart/form-data">
                        <DialogTitle>Category</DialogTitle>
                        <DialogContent>
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
                                helperText={errors.name && touched.name ? errors.name : ''}
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
                                helperText={errors.description && touched.description ? errors.description : ''}
                            />
                            <div>
                                <label htmlFor="profile">category_img: </label>
                                <input
                                    id="cat_img"
                                    type="file"
                                    name="cat_img"
                                    style={{ marginLeft: "10px" }}
                                    onChange={(e) =>
                                        setFieldValue("cat_img", e.target.files[0])
                                    }
                                />
                                <img
                                    src={
                                        typeof values?.cat_img?.url === "string"
                                            ? values?.cat_img?.url
                                            : values.cat_img ? URL.createObjectURL(values.cat_img) : 'img/avatar.jpg'
                                        // :  URL.createObjectURL(values.cat_img)
                                    }
                                    height={"100"}
                                    width={"100"}
                                />
                                {errors.cat_img && touched.cat_img ? (
                                    <p style={{ color: "red", fontSize: "small" }}>
                                        {errors.cat_img}
                                    </p>
                                ) : null}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            {/* (isEdit || isEdit === 0) ? "Update" : "Submit" */}
                            <Button type="submit">{
                                isUpdate ? "Update" : "Submit"
                            }</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>
            <Box sx={{ mt: 5 }}>
                <Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={category?.categories}
                        getRowId={(row) => row._id}
                        columns={columns}
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

export default Category;

// import * as React from 'react';
// import { useEffect } from 'react';
// import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
// import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import EditIcon from '@mui/icons-material/Edit';
// import { object, string } from 'yup';
// import { useFormik } from 'formik';


// const paginationModel = { page: 0, pageSize: 5 };

// function Category(props) {
//     const [open, setOpen] = React.useState(false);
//     const [categoryTable, setCategoryTable] = React.useState([]);
//     // const [isEdit, setIsEdit] = React.useState(null);
//     const [isUpdate, setIsUpdate] = React.useState(false);

//     const getCategoryData = () => {
//         const localStorageCategory = JSON.parse(localStorage.getItem('category'));
//         if (localStorageCategory) {
//             setCategoryTable(localStorageCategory);
//         }

//     }

//     useEffect(() => {
//         getCategoryData();
//     }, []);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleDelete = (id) => {
//         const localData = JSON.parse(localStorage.getItem('category'));
//         // const index = localData.findIndex((item) => item.id === id);
//         // localData.splice(index, 1);
//         const newData = localData.filter(data => data.id !== id);
//         localStorage.setItem('category', JSON.stringify(newData));
//         setCategoryTable(newData);
//     }

//     const handleEdit = (data) => {
//         handleClickOpen();
//         // setIsEdit(index);
//         setIsUpdate(true);
//         setValues(data);
//     }

//     const columns = [
//         { field: 'name', headerName: 'Name', width: 350 },
//         { field: 'description', headerName: 'Description', width: 650 },
//         {
//             field: 'action',
//             headerName: 'Action',
//             width: 200,
//             renderCell: (params) => (
//                 <strong>
//                     <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
//                         <GridDeleteIcon />
//                     </IconButton>
//                     <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
//                         <EditIcon />
//                     </IconButton>
//                 </strong>
//             ),
//         },
//     ];

//     const categorySchema = object({
//         name: string().required(),
//         description: string().required(),
//     })

//     const updateCategory = (values) => {
//         const localData = JSON.parse(localStorage.getItem('category'));
//         const index = localData.findIndex((item) => item.id === values.id);
//         localData[index] = values;
//         localStorage.setItem('category', JSON.stringify(localData));
//         setCategoryTable(localData);
//         setIsUpdate(false);
//     }

//     const addCategory = (values) => {
//         const localData = JSON.parse(localStorage.getItem('category'));
//         if (localData) {
//             // if (isEdit || isEdit === 0) {
//             //     const id = localData[isEdit].id;
//             //     localData[isEdit] = { ...values, id };
//             //     setIsEdit(null);
//             // } else {
//             //     localData.push({ ...values, id: Date.now() });
//             // }
//             localData.push({ ...values, id: Date.now() });
//             localStorage.setItem('category', JSON.stringify(localData));
//             setCategoryTable(localData);
//         } else {
//             localStorage.setItem('category', JSON.stringify([{ ...values, id: Date.now() }]));
//             setCategoryTable([{ ...values, id: Date.now() }]);
//         }
//     }

//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             description: '',
//         },
//         validationSchema: categorySchema,
//         onSubmit: (values, { resetForm }) => {
//             // alert(JSON.stringify(values, null, 2));
//             if(isUpdate){
//                 updateCategory(values);
//             } else {
//                 addCategory(values);
//             }
//             resetForm();
//             handleClose();
//         },
//     });

//     const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues, resetForm } = formik;

//     const handleClose = () => {
//         setOpen(false);
//         resetForm();
//         // setIsEdit(null);
//         setIsUpdate(false);
//     };


//     return (
//         <Box >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <h1>Category</h1>
//                 <Button variant="outlined" onClick={handleClickOpen}>
//                     Add Category
//                 </Button>
//                 <Dialog
//                     open={open}
//                     onClose={handleClose}
//                 >
//                     <form onSubmit={handleSubmit}>
//                         <DialogTitle>Category</DialogTitle>
//                         <DialogContent>
//                             <TextField
//                                 onBlur={handleBlur}
//                                 margin="dense"
//                                 id="name"
//                                 name="name"
//                                 label="name"
//                                 type="text"
//                                 fullWidth
//                                 variant="standard"
//                                 onChange={handleChange}
//                                 value={values.name}
//                                 error={errors.name && touched.name}
//                                 helperText={errors.name && touched.name ? errors.name : ''}
//                             />
//                             <TextField
//                                 margin="dense"
//                                 id="description"
//                                 name="description"
//                                 label="description"
//                                 type="text"
//                                 fullWidth
//                                 variant="standard"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.description}
//                                 error={errors.description && touched.description}
//                                 helperText={errors.description && touched.description ? errors.description : ''}
//                             />
//                         </DialogContent>
//                         <DialogActions>
//                             <Button onClick={handleClose}>Cancel</Button>
//                             {/* (isEdit || isEdit === 0) ? "Update" : "Submit" */}
//                             <Button type="submit">{
//                                 isUpdate ? "Update" : "Submit"
//                             }</Button>
//                         </DialogActions>
//                     </form>
//                 </Dialog>
//             </Box>
//             <Box sx={{ mt: 5 }}>
//                 <Paper sx={{ height: 400, width: '100%' }}>
//                     <DataGrid
//                         rows={categoryTable}
//                         columns={columns}
//                         initialState={{ pagination: { paginationModel } }}
//                         pageSizeOptions={[5, 10]}
//                         checkboxSelection
//                         sx={{ border: 0 }}
//                     />
//                 </Paper>
//             </Box>
//         </Box>
//     );
// }

// export default Category;