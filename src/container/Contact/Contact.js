import React, { useEffect } from 'react';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { TextField, Button, Box, Paper, IconButton } from '@mui/material';
import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

function Contact(props) {
    const [contactTable, setContactTable] = React.useState([]);
    const [isEdit, setIsEdit] = React.useState(null);

    const getContactData = () => {
        const localStorageContact = JSON.parse(localStorage.getItem('contact'));
        if (localStorageContact) {
            setContactTable(localStorageContact);
        }
    }

    useEffect(() => {
        getContactData();
    },[]);
    
    const contactSchema = object({
        name: string().required(),
        email: string().email().required(),
        message: string().required(),
    })

    const paginationModel = { page: 0, pageSize: 5 };

    const handleDelete = (id) => {
        const localData = JSON.parse(localStorage.getItem('contact'));
        const newData = localData.filter(data => data.id !== id);
        localStorage.setItem('contact', JSON.stringify(newData));
        setContactTable(newData);
    }

    const handleEdit = (data) => {        
        const localData = JSON.parse(localStorage.getItem('contact'));
        const index = localData.findIndex((item) => item.id === data.id);      
        setIsEdit(index);
        setValues(data);
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'email', headerName: 'Email', width: 350 },
        { field: 'message', headerName: 'Message', width: 350 },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <strong>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
                        <GridDeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </strong>
            ),
        },
    ];

    const addContact = (data) => {
        const contactData = JSON.parse(localStorage.getItem('contact'));
        if (contactData) {
            contactData.push({...data, id: +new Date()});
            localStorage.setItem('contact', JSON.stringify(contactData));
            setContactTable(contactData);
        } else {
            localStorage.setItem('contact', JSON.stringify([{...data, id: +new Date()}]));
            setContactTable([{...data, id: +new Date()}]);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
        },
        validationSchema: contactSchema,
        onSubmit: (values, { resetForm }) => {
            // alert(JSON.stringify(values, null, 2));
            addContact(values);
            resetForm();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues } = formik;    
    return (
        <>

            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Contact</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Contact</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Contact Start */}
            <div className="container-fluid contact py-5">
                <div className="container py-5">
                    <div className="p-5 bg-light rounded">
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                                    <h1 className="text-primary">Get in touch</h1>
                                    <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax &amp; PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="h-100 rounded">
                                    <iframe className="rounded w-100" style={{ height: 400 }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <form onSubmit={handleSubmit} >
                                    <TextField
                                        type="text"
                                        variant="standard"
                                        className="w-100 py-3 mb-4"
                                        placeholder="Your Name"
                                        name="name"
                                        label="Name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        error={errors.name && touched.name}
                                        helperText={errors.name && touched.name ? errors.name : null}
                                    />
                                    <TextField
                                        type="email"
                                        variant="standard"
                                        className="w-100 py-3 mb-4"
                                        placeholder="Enter Your Email"
                                        name="email"
                                        label="Email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        error={errors.email && touched.email}
                                        helperText={errors.email && touched.email ? errors.email : null}
                                    />
                                    <TextField
                                        id="standard-multiline-static"
                                        label="Message"
                                        multiline
                                        rows={3}
                                        variant="standard"
                                        className="w-100 py-3 mb-4"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.message}
                                        name="message"
                                        error={errors.message && touched.message}
                                        helperText={errors.message && touched.message ? errors.message : null}
                                    />                                    
                                    <Button
                                        className="w-100 btn py-3 bg-white text-primary rounded-10"
                                        variant="outlined"
                                        type="submit">
                                        {
                                            isEdit || isEdit === 0 ? "Update" : "Submit"
                                        }
                                    </Button>
                                </form>
                            </div>
                            <div className="col-lg-5">
                                <div className="d-flex p-4 rounded mb-4 bg-white">
                                    <i className="fas fa-map-marker-alt fa-2x text-primary me-4" />
                                    <div>
                                        <h4>Address</h4>
                                        <p className="mb-2">123 Street New York.USA</p>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded mb-4 bg-white">
                                    <i className="fas fa-envelope fa-2x text-primary me-4" />
                                    <div>
                                        <h4>Mail Us</h4>
                                        <p className="mb-2">info@example.com</p>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded bg-white">
                                    <i className="fa fa-phone-alt fa-2x text-primary me-4" />
                                    <div>
                                        <h4>Telephone</h4>
                                        <p className="mb-2">(+012) 3456 7890</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Box sx={{ mt: 5 }}>
                    <Paper sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={contactTable}
                            columns={columns}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            sx={{ border: 0 }}
                        />
                    </Paper>
                </Box>
            </div>
            {/*Contact End*/}

        </>
    );
}

export default Contact;