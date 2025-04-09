import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, IconButton, InputLabel, Paper, TextField, Switch, FormGroup, FormControlLabel } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect } from 'react'
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { boolean, date, number, object, ref, string } from 'yup';
import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupons, deleteCoupon, getCoupons, updateCoupon } from '../../../redux/reducer/slice/coupon.slice';

export default function CouponCode() {
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const [isUpdate, setIsUpdate] = React.useState(false);

    const couponCode = useSelector(state => state.coupon.couponCode);

    console.log("coponCode", couponCode);


    const handleClickOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        dispatch(getCoupons())
    }, [])
    const handleClose = () => {
        setOpen(false);
        resetForm();
        // setIsEdit(null);
        setIsUpdate(false);
    };
    const handleDeleteModel = (row_id) => {        
        dispatch(deleteCoupon(row_id));
        // setDeleteId(row_id);
        // setOpenDelete(!openDelete);
    }

    const couponSchema = object({
        name: string().required(),
        isActive: boolean().required(),
        discount: number().required(),
        from: date().min(new Date(), "Please choose future dates.").required(),
        to: date().required().min(ref('from'), "to date must be after the from date.")
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            isActive: true,
            discount: '',
            from: dayjs(),
            to: dayjs().add(1, 'day')
        },
        validationSchema: couponSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            if(isUpdate){
                dispatch(updateCoupon(values))
            } else {
                dispatch(addCoupons(values));
            }
            handleClose();            
        },
    });
    const columns = [
        { field: "name", headerName: "Name", width: 150 },
        { field: "discount", headerName: "Discount", width: 150 },
        { 
            field: "from", 
            headerName: "Start Date", 
            width: 250,
            valueGetter: (value) => {
                return dayjs(value).format('DD/MM/YYYY')
            }
        },
        { 
            field: "to", 
            headerName: "End Date", 
            width: 250 ,
            valueGetter: (value) => {
                return dayjs(value).format('DD/MM/YYYY')
            }
        },
        { field: "isActive", headerName: "Active", width: 150 },
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
    const { handleSubmit, handleChange, handleBlur, setValues, values, errors, touched, setFieldValue, setFieldError, resetForm } = formik
    const handleEdit = (data) => {
        handleClickOpen();
        // setIsEdit(index);
        setIsUpdate(true);
        setValues(data);
    };
    const paginationModel = { page: 0, pageSize: 5 };
    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Coupon Code</h1>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Coupon
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <form onSubmit={handleSubmit} >
                        <DialogTitle>Coupon Code</DialogTitle>
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
                                helperText={errors.name && touched.name ? errors.name : ""}
                            />
                            <TextField
                                margin="dense"
                                id="discount"
                                name="discount"
                                label="discount"
                                type="text"
                                fullWidth
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.discount}
                                error={errors.discount && touched.discount}
                                helperText={errors.discount && touched.discount ? errors.discount : ""}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>

                                    <DatePicker
                                        label="From"
                                        name='from'
                                        value={dayjs(values.from)}
                                        onChange={(value) => setFieldValue("from", value)}
                                        onBlur={handleBlur}
                                        onError={(value) => setFieldError("from", value)}
                                        slotProps={{
                                            textField: {
                                                helperText: errors.from && touched.from ? errors.from : "",
                                            },
                                        }}
                                        minDate={dayjs()}
                                    />
                                    <DatePicker
                                        label="To"
                                        name='to'
                                        value={dayjs(values.to)}
                                        onChange={(value) => setFieldValue("to", value)}
                                        onBlur={handleBlur}
                                        onError={(value) => setFieldError("to", value)}
                                        slotProps={{
                                            textField: {
                                                helperText: errors.to && touched.to ? errors.to : "",
                                            },
                                        }}
                                        minDate={(dayjs(values?.from).add(1, "day"))}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <FormGroup>
                                <FormControlLabel control={
                                    <Switch
                                        name="isActive"
                                        checked={values.isActive}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                    label="isActive"
                                />
                            </FormGroup>
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
                        rows={couponCode || []}
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
    )
}
