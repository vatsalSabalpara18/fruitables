import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, FormHelperText } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { number, object, string } from 'yup';
import { useFormik } from 'formik';

function SubCategory(props) {
    const [open, setOpen] = React.useState(false);
    const [categoryList, setCategoryList] = React.useState([]);

    const getCategoryList = () => {
        const localCategoryData = JSON.parse(localStorage.getItem('category'));
        if (localCategoryData) {
            setCategoryList(localCategoryData);
        }
    }

    React.useEffect(() => {
        getCategoryList();
        console.log(categoryList);
    },[]);

    const SubCategorySchema = object({
        category: number().required(),
        name: string().required(),
        description: string().required()
    });

    const formik = useFormik({
        initialValues: {
            category: 0,
            name: '',
            description: ''
        },
        validationSchema: SubCategorySchema,
        onSubmit: (values, {resetForm}) => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues, resetForm } = formik;    
  
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Submit</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>
        </Box>
    );
}

export default SubCategory;