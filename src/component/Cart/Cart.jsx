import React, {useContext} from 'react';
import {Box, Button, Card, Divider, Grid, Modal, TextField} from "@mui/material";
import CartItem from "./CartItem";
import {AppContext} from "../../context/AppContext";
import AddressCard from "./AddressCard";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {createOrder} from "../../State/Orders/Action";

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: 'none',
    boxShadow: 24,
    p: 4,
};

const initialValues = {
    streetAddress: "",
    state:"",
    pincode:"",
    city:""
}

const validationSchema = Yup.object().shape({
    streetAddress: Yup.string().required("Street address is required !"),
    state: Yup.string().required("State is required !"),
    pincode: Yup.number().required("Pincode is required !"),
    city: Yup.string().required("City is required !")
})


const Cart = () => {

    const {currency, jwt} = useContext(AppContext);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const { cartItems, cart } = useSelector((store) => store.cart)
    const { user } = useSelector((store) => store.auth)
    const dispatch = useDispatch()

    const createOrderUsingSelectedAddress = () => {

    }

    const openAddressModal = () => {
        setOpen(true)
    }

    const handleSubmit = async (values) => {
        const data ={
            jwt: jwt,
            order:{
                restaurantId: cartItems[0].food?.restaurant.id,
                deliveryAddress: {
                    fullName: user?.fullName,
                    streetAddress: values.streetAddress,
                    city: values.city,
                    state: values.state,
                    postalCode: values.pincode,
                    country: "viet nam"
                }
            }
        }
        dispatch(createOrder(data))
        console.log("form value", values)
    }

    return (
        <>
            <main className='lg:flex justify-between'>
                <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
                    {
                       cartItems?.map((item) => <CartItem key={item.id} item={item}/>)
                    }

                    <Divider/>

                    <div className='px-5 text-sm'>
                        <p className='font-extralight py-5'>Bill Details</p>
                        <div className='space-y-3'>
                            <div className='flex justify-between text-gray-400'>
                                <p>Item Total</p>
                                <p>{currency} {cart?.total}</p>
                            </div>

                            <div className='flex justify-between text-gray-400'>
                                <p>Deliver Fee</p>
                                <p>{currency}40</p>
                            </div>

                            <div className='flex justify-between text-gray-400'>
                                <p>VTA</p>
                                <p>{currency}20</p>
                            </div>
                            <Divider/>
                        </div>
                        <div className='justify-between flex text-gray-400'>
                            <p>Total pay</p>
                            <p>{currency} {cart?.total + 33 + 21}</p>
                        </div>
                    </div>
                </section>

                <Divider orientation="vertical" flexItem />
                <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                    <div>
                        <h1 className='text-center font-semibold text-2xl py-10'>Choose delevery address</h1>

                        <div className='flex gap-5 flex-wrap justify-center'>
                            {[1,1,1].map((item) => <AddressCard handleSelectAddress={createOrderUsingSelectedAddress} item={item} showButton={true}/>)}

                            <Card className='flex gap-5 w-64 p-5'>
                                <AddLocationAltIcon/>
                                <div className='space-y-3 text-gray-500'>
                                    <h1 className='font-semibold text-lg text-white'>Add new address</h1>

                                    <Button  variant='outlined' fullWidth onClick={openAddressModal}>Add</Button>


                                </div>
                            </Card>
                        </div>


                    </div>
                </section>

            </main>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(e) => handleSubmit(e)}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="streetAddress"
                                        label="Street Address"
                                        fullWidth
                                        variant="outlined"
                                        // error={!ErrorMessage("streetAddress")}
                                        // helperText={
                                        // <ErrorMessage>
                                        //     {(msg) => <span className='text-red-600'>{msg}</span>}
                                        // </ErrorMessage>
                                        // }
                                    />

                                </Grid>


                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="state"
                                        label="State"
                                        fullWidth
                                        variant="outlined"
                                    />

                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="city"
                                        label="City"
                                        fullWidth
                                        variant="outlined"
                                    />

                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="pincode"
                                        label="Pincode"
                                        fullWidth
                                        variant="outlined"
                                    />

                                </Grid>

                                <Grid item xs={12}>
                                    <Button fullWidth variant="contained" type="submit" color="primary">
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>

                    </Formik>
                </Box>
            </Modal>

        </>
    );
};

export default Cart;
