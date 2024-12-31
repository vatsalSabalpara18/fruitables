import * as React from 'react';
import { useEffect } from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { object, string } from 'yup';
import { useFormik } from 'formik';


const paginationModel = { page: 0, pageSize: 5 };

function Category(props) {
    const [open, setOpen] = React.useState(false);
    const [categoryTable, setCategoryTable] = React.useState([]);

    const getCategoryData = () => {
        const localStorageCategory = JSON.parse(localStorage.getItem('category'));
        if (localStorageCategory) {
            setCategoryTable(localStorageCategory);
        }
        
    }

    useEffect(() => {
        getCategoryData();
    }, []);

    const handleDelete = (id) => { 
        const localData = JSON.parse(localStorage.getItem('category'));
        const newData = localData.filter(data => data.id !== id);
        localStorage.setItem('category', JSON.stringify(newData));
        setCategoryTable(newData);
     }


    const columns = [
        { field: 'name', headerName: 'Name', width: 350 },
        { field: 'description', headerName: 'Description', width: 650 },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <strong>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
                        <GridDeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => console.log(params.row.id)}>
                        <EditIcon />
                    </IconButton>
                </strong>
            ),
        },
    ];


    const handleClickOpen = () => {
        setOpen(true);
    };

    const categorySchema = object({
        name: string().required(),
        description: string().required(),
    })

    const addCategory = (values) => {
        const localData = JSON.parse(localStorage.getItem('category'));        
        if (localData) {
            localData.push({...values, id: Date.now()});
            localStorage.setItem('category', JSON.stringify(localData));
            setCategoryTable(localData);
        } else {
            localStorage.setItem('category', JSON.stringify([{...values, id: Date.now()}]));
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: categorySchema,
        onSubmit: (values, { resetForm }) => {
            // alert(JSON.stringify(values, null, 2));
            addCategory(values);
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = formik;

    const handleClose = () => {
        setOpen(false);
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
                    <form onSubmit={handleSubmit}>
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
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Submit</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>
            <Box sx={{ mt: 5 }}>
                <Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={categoryTable}
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