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
import { number, object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addSubCategories, deleteCategories, getSubCategories, updateCategories } from '../../../redux/reducer/slice/subcategory.slice';

function SubCategory(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [isUpdate, setIsUpdate] = React.useState(false);
    const [categoryList, setCategoryList] = React.useState([]);

    const subCategory = useSelector(state => state.subcategory);

    console.log("SubCategory", subCategory);

    const getCategoryList = () => {
        const localCategoryData = JSON.parse(localStorage.getItem('category'));
        if (localCategoryData) {
            setCategoryList(localCategoryData);
        }
    }

    const handleDelete = (id) => { 
        console.log("id",id)
        dispatch(deleteCategories(id))
    }

    const handleEdit = (data) => { 
        handleClickOpen()
        console.log(data);
        setValues(data)
        setIsUpdate(true)
     }

    const columns = [
        {
            field: 'category_id',
            headerName: 'Category',
            width: 130,
            valueGetter: (value) => {                
                return categoryList.find(item => item.id === value)?.name;
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
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
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
        category: number().required(),
        name: string().required(),
        description: string().required()
    });

    const AddSubCategory = (values) => {
        const id = +new Date;
        dispatch(addSubCategories({ ...values, id }));
    }

    const UpdateSubCategory = (values) => {        
        dispatch(updateCategories(values))
    }

    const formik = useFormik({
        initialValues: {
            category_id: 0,
            name: '',
            description: ''
        },
        validationSchema: SubCategorySchema,
        onSubmit: (values, { resetForm }) => {
            // alert(JSON.stringify(values, null, 2));
            if(isUpdate){
                UpdateSubCategory(values)
            } else {
                AddSubCategory(values);
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues, resetForm } = formik;

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
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Sub Category</DialogTitle>
                        <DialogContent>
                            <InputLabel id="demo-simple-select-standard-label">category</InputLabel>
                            <FormControl fullWidth error={errors.category_id && touched.category_id ? errors.category_id : ''}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={values.category_id}
                                    onChange={handleChange}
                                    label="Age"
                                    fullWidth
                                    variant='standard'
                                    error={errors.category_id && touched.category_id}
                                    onBlur={handleBlur}
                                    name="category_id"
                                >
                                    <MenuItem value="0">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        categoryList.map((item, index) => {
                                            return <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
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
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">{ isUpdate ? "Update" : "Submit"}</Button>
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