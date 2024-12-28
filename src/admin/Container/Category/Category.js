import * as React from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';

// function createData(name, description) {
//     return { name, description };
// }

// const rows = [
//     createData('Frozen yoghurt', 'lorem ipsum dolor sit amet consectetur adipisicing elit. '),
//     createData('Ice cream sandwich', 'lorem ipsum dolor sit amet consectetur adipisicing elit. '),
//     createData('Eclair', 'lorem ipsum dolor sit amet consectetur adipisicing elit. '),
//     createData('Cupcake', 'lorem ipsum dolor sit amet consectetur adipisicing elit. '),
//     createData('Gingerbread', 'lorem ipsum dolor sit amet consectetur adipisicing elit. '),
// ];

const columns = [    
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 400 },
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
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    // },
];

const rows = [
    { id:'1', name: 'Snow', description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. ' },
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
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const email = formJson.email;
                            console.log(email);
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>Category</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="name"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="description"
                            name="description"
                            label="description"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
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