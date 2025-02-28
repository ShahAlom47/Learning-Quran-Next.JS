"use client";

import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "../Redux/Slice/counterSlice";

export default function ReduxExample() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className=" space-y-4 my-8" >
      <h1>Redux Toolkit + Next.js</h1>
      <h2>Count: {count}</h2>

      <button className=" bg-slate-400 px-2 rounded-sm mr-3" onClick={() => dispatch(increment())}>Increment</button>

      <button className=" bg-slate-400 px-2 rounded-sm mr-3" onClick={() => dispatch(decrement())}>Decrement</button>

      <button className=" bg-slate-400 px-2 rounded-sm mr-3" onClick={() => dispatch(incrementByAmount(5))}>
        Increment by 5
      </button>
    </div>
  );
}
