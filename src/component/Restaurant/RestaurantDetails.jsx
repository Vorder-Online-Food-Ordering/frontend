import React, {useContext, useEffect, useState} from 'react';
import {Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography} from "@mui/material";
import {assets} from "../../assets/assets";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from "./MenuCard";
import {AppContext} from "../../context/AppContext";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getRestaurantById, getRestaurantCategory} from "../../State/Restaurant/Action";
import {getMenuItemsByRestaurantId} from "../../State/Menu/Action";


const foodTypes = [
    {label: "All", value: "all"},
    {label: "Vegetarian only", value: "vegetarian"},
    {label: "Non-Vegetarian", value: "non_vegetarian"},
    {label: "Seasonal", value: "seasonal"}
]

const RestaurantDetails = () => {

    const {currency, jwt} = useContext(AppContext)

    const [foodType, setFoodType] = useState("all")
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { restaurant, categories } = useSelector((store) => store.restaurant)
    const { menuItems } = useSelector((store) => store.menu);
    const [selectedCategory, setSelectedCategory] = useState(" ");


    const handleFilter = (e) => {
        setFoodType(e.target.value)
        console.log(e.target.value)
    }

    const handleFilterCategory = (e, value) => {
        setSelectedCategory(value)

        console.log(e.target.value, e.target.name, value)
    }

    useEffect(() => {
        dispatch(getRestaurantById({jwt, restaurantId: id}))
        dispatch(getRestaurantCategory({jwt, restaurantId: id}))
    }, []);

    useEffect(() => {
        dispatch(getMenuItemsByRestaurantId({jwt, restaurantId: id,
            vegetarian: foodType==="vegetarian",
            nonveg: foodType==="non_vegetarian",
            seasonal: foodType==="seasonal",
            foodCategory: selectedCategory}))

    }, [selectedCategory, foodType]);

    return (
        <div className='px-5 lg:px-20'>
            <section>
                <h3 className='text-gray-500 py-2 mt-10'>Home / vietnam / vietnam food / 3 </h3>
                <div>
                    <Grid container spacing={12}>
                        <Grid item xs={12}>
                            <img src={restaurant?.images[0]} alt='' className='w-full h-[40vh] object-cover'/>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <img src={restaurant?.images[1]} alt='' className='w-full h-[40vh] object-cover'/>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <img src={assets.banner} alt='' className='w-full h-[40vh] object-cover'/>
                        </Grid>
                    </Grid>

                </div>

                <div className='pt-3 pb-5'>
                    <h1 className='text-4xl font-semibold'>{restaurant?.name}</h1>

                    <p className='text-gray-500 mt-1'>
                        {restaurant?.description}
                    </p>

                    <div className='space-y-3 mt-3'>
                        <p className='text-gray-400 flex items-center gap-3'>
                            <LocationOnIcon/>
                            <span>
                            VietNam, Da Nang

                       </span>
                        </p>


                        <p className='text-gray-400 flex items-center gap-3'>
                            <CalendarTodayIcon/>
                            <span>
                         Mon-Sun: 9:00 AM - 9:00 PM
                       </span>
                        </p>
                    </div>
                </div>
            </section>
            <Divider/>
            <section className='pt-[2rem] lg:flex relative'>
                <div className='space-y-10 lg:w-[20%] filter'>

                    <div className='space-y-5 lg:sticky top-28'>
                        <div>
                            <Typography variant='h5' sx={{paddingBottom: '1rem'}}>
                                Food Type
                            </Typography>

                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={(e) => handleFilter(e)}
                                            name="food_type" value={foodType}>
                                    {foodTypes.map((item) =>
                                        <FormControlLabel
                                            key={item.value}
                                            value={item.value}
                                            control={<Radio/>}
                                            label={item.label}/>)
                                    }
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider />
                        <div>
                            <Typography variant='h5' sx={{paddingBottom: '1rem'}}>
                                Food Category
                            </Typography>

                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={handleFilterCategory}
                                            name="food_category"
                                            value={selectedCategory}
                                >
                                    {categories?.map((item) =>
                                        <FormControlLabel
                                            key={item.id}
                                            value={item.name}
                                            control={<Radio/>}
                                            label={item.name}/>)
                                    }
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                </div>

                <div className='space-y-5 lg:w-[80%] lg:pl-10'>
                    {menuItems.map((item, index) => <MenuCard key={index} item={item}/>)}
                </div>
            </section>
        </div>
    );
};

export default RestaurantDetails;
