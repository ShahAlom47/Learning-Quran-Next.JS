"use client"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../Redux/Slice/cartSlice";


const 

Cart = () => {

    const data = useSelector(state => state.cart)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchCartData())

    },[dispatch])

    console.log(data);


    return (
        <div className=" min-h-10">

            cart :{data?.data?.length} data
            
        </div>
    );
};

export default Cart;