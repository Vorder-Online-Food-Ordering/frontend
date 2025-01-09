import React from 'react';
import {Button, TextField, Typography} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginUser} from "../../State/Authentication/Action";

const initialValues = {
    email:'',
    password:''
}
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = async (values) => {
        dispatch(loginUser({userData:values, navigate}))
    }
    return (
        <div>
            <Typography variant='h5' className='text-center'>
                Login
            </Typography>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        margin="normal"

                    />

                    <Field
                        as={TextField}
                        name="password"
                        label="Password"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />

                    <Button sx={{mt:2, padding:"1rem"}} fullWidth type='submit' variant='contained'>
                        Login
                    </Button>

                </Form>

            </Formik>

            <Typography variant='body2' align='center' sx={{mt:3}}>
                Don't have an account?
                <Button onClick={() => navigate("/account/register")}>
                    Register
                </Button>
            </Typography>
        </div>
    );
};

export default Login;
