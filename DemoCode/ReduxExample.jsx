"use client";

import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "../Slice/counterSlice";
import { deleteProduct } from "../Slice/productSlice";
import { useGetDataQuery } from "../Slice/apiSlice";

export default function ReduxExample() {
  const count = useSelector((state) => state?.counter?.value);
  const product = useSelector((state) => state?.products);
  const dispatch = useDispatch();

  const{data,error, isLoading}=useGetDataQuery('/products?limit=10')

  console.log(data,'RTK query  data');


  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
};

  return (
    <div className=" space-y-4 my-8" >
      <h1>Redux Toolkit + Next.js</h1>
      <h2>Count: {count}</h2>
      <h2>Total Product: {product?.products?.products?.length} Data</h2>
      <h2>RTK query  data: {data?.products?.length} Data</h2>


      <button className=" bg-slate-400 px-2 rounded-sm mr-3" onClick={() => dispatch(increment())}>Increment</button>

      <button className=" bg-slate-400 px-2 rounded-sm mr-3" onClick={() => dispatch(decrement())}>Decrement</button>

      <button className=" bg-slate-400 px-2 rounded-sm mr-3" onClick={() => dispatch(incrementByAmount(5))}>
        Increment by 5
      </button>
    </div>
  );
}
