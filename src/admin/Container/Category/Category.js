import * as React from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { object, string } from 'yup';
import { useFormik } from 'formik';

const columns = [
    { field: 'name', headerName: 'Name', width: 350 },
    { field: 'description', headerName: 'Description', width: 650 },
    {
        field: 'action',
        headerName: 'Action',
        width: 200,
        renderCell: (params) => (
            <strong>
                <IconButton aria-label="delete">
                    <GridDeleteIcon />
                </IconButton>
                <IconButton aria-label="edit">
                    <EditIcon />
                </IconButton>
            </strong>
        ),
    },    
];

const rows = [
    { id: '1', name: 'Snow', description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. ' },
    { id: '2', name: 'Lannister', description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. ' },
    { id: '3', name: 'Lannister', description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. ' },
    { id: '4', name: 'Stark', description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. ' },
    { id: '5', name: 'Targaryen', description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. ' },
    { id: '6', name: 'Melisandre', description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. ' },
    { id: '7', name: 'Clifford', description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. ' },
    { id: '8', name: 'Frances', description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. ' },
    { id: '9', name: 'Roxie', description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. ' },
];

const paginationModel = { page: 0, pageSize: 5 };

function Category(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const categorySchema = object({
        name: string().required(),
        description: string().required(),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: categorySchema,
        onSubmit: (values, {resetForm} ) => {
            alert(JSON.stringify(values, null, 2));
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
                        rows={rows}
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