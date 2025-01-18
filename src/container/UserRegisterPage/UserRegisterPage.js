import React, { useEffect } from "react";
import { array, date, mixed, number, object, string } from "yup";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, getUsers } from "../../redux/reducer/slice/user.slice";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';

function UserRegisterPage() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUsers());
  }, [])

  const user = useSelector(state => state.user)

  const contactSchema = object().shape({
    name: string()
      .matches(/^[A-Z a-z]*$/, "please enter vaild name")
      .max(30)
      .min(2)
      .required(),
    age: number().required().positive().integer().min(1),
    address: string()
      .required()
      .test("address", "address must not exceed 100 words", (value) => {
        return (value ? value.split(/\s+/).length : 0) <= 100;
      }),
    dob: date().max(new Date(), "Please enter the valid date").required(),
    profile: mixed()
      .required("You need provide the file.")
      .test("profile", "The file is too large", (value) => {
        console.log("value", value);
        return value && value.size <= 2000000;
      })
      .test(
        "profile",
        "only the following formats are allowed: jpeg, jpg & png",
        (value) => {
          return (
            value && (value.type === "image/jpeg" || value.type === "image/png")
          );
        }
      ),
    country: string().required().min(2),
    gender: string().required(),
    hobby: array().required().min(2),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      address: "",
      dob: "",
      profile: null,
      country: "",
      gender: "",
      hobby: [],
    },
    validationSchema: contactSchema,
    onSubmit: (values, { resetForm }) => {
      const modifiedValues = { ...values, profile: values?.profile?.name }
      dispatch(addUser(modifiedValues));
      // alert(JSON.stringify(values, null, 2));
      // addContact(values);
      resetForm();
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
    setFieldValue,
  } = formik;

  const paginationModel = { page: 0, pageSize: 5 };

  const columns = [
    { field: 'profile', headerName: 'Profile Picture', },
    { field: 'name', headerName: 'Name', },
    { field: 'age', headerName: 'Age', },
    { field: 'address', headerName: 'Address', width: 350},
    { field: 'dob', headerName: 'Date of Birth', },
    { field: 'country', headerName: 'Country', },
    { field: 'gender', headerName: 'Gender', },
    { field: 'hobby', headerName: 'Hobbies', },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => (
        <strong>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
            <GridDeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => console.log(params.row)}>
            <EditIcon />
          </IconButton>
        </strong>
      ),
    },
  ];

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">User Registration</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active text-white">
            user registration
          </li>
        </ol>
      </div>
      <div className="container-fuild py-5">
        <div className="p-5 bg-light rounded">
          <div className="row g-4">
            <div className="col-lg-7">
              <form onSubmit={handleSubmit}>
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
                  type="number"
                  variant="standard"
                  className="w-100 py-3 mb-4"
                  placeholder="Enter Your Age"
                  name="age"
                  label="Age"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.age}
                  error={errors.age && touched.age}
                  helperText={errors.age && touched.age ? errors.age : null}
                />
                <TextField
                  id="standard-multiline-static"
                  label="Address"
                  multiline
                  rows={3}
                  placeholder="Enter Your Address"
                  variant="standard"
                  className="w-100 py-3 mb-4"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  name="address"
                  error={errors.address && touched.address}
                  helperText={
                    errors.address && touched.address ? errors.address : null
                  }
                />
                <TextField
                  type="date"
                  variant="standard"
                  className="w-100 py-3 mb-4"
                  name="dob"
                  label="Date Of Birth"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dob}
                  error={errors.dob && touched.dob}
                  helperText={errors.dob && touched.dob ? errors.dob : null}
                />
                <div>
                  <label htmlFor="profile">Profile: </label>
                  <input
                    id="prfile"
                    type="file"
                    name="profile"
                    style={{ marginLeft: "10px" }}
                    onChange={(e) =>
                      setFieldValue("profile", e.target.files[0])
                    }
                  />
                  {errors.profile && touched.profile ? (
                    <p style={{ color: "red", fontSize: "small" }}>
                      {errors.profile}
                    </p>
                  ) : null}
                </div>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: 120 }}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Country
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Country"
                    name="country"
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"IN"}>India</MenuItem>
                    <MenuItem value={"USA"}>USA</MenuItem>
                    <MenuItem value={"CA"}>Canada</MenuItem>
                  </Select>
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.country && touched.country ? errors.country : null}
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.gender && touched.gender ? errors.gender : null}
                  </FormHelperText>
                </FormControl>
                <FormGroup>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Hobbies:
                  </FormLabel>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="hobby"
                        checked={values.hobby.includes("cricket")}
                        onChange={handleChange}
                        value={"cricket"}
                      />
                    }
                    label="Cricket"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="hobby"
                        checked={values.hobby.includes("music")}
                        onChange={handleChange}
                        value={"music"}
                      />
                    }
                    label="Music"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="hobby"
                        onChange={handleChange}
                        checked={values.hobby.includes("chess")}
                        value={"chess"}
                      />
                    }
                    label="Chess"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="hobby"
                        onChange={handleChange}
                        checked={values.hobby.includes("vollyball")}
                        value={"vollyball"}
                      />
                    }
                    label="Vollyball"
                  />
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.hobby && touched.hobby ? errors.hobby : null}
                  </FormHelperText>
                </FormGroup>
                <Button
                  className="w-100 btn py-3 bg-white text-primary rounded-10"
                  variant="outlined"
                  type="submit"
                >
                  Submit
                </Button>
              </form>              
            </div>
            <Box sx={{ mt: 5 }}>
              <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={user?.user}
                  columns={columns}
                  initialState={{ pagination: { paginationModel } }}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                  sx={{ border: 0 }}
                />
              </Paper>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserRegisterPage;
