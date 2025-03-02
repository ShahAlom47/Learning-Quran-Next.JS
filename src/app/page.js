
import React from 'react';
import ReduxExample from '../Redux/DemoCode/ReduxExample';
import Cart from '../components/Cart';

const Home = () => {

    // console.log(bb);


    return (
        <div className=' border   border-black text-xl'>
            <Cart></Cart>

            Home 

            Redux use case 
            <ReduxExample></ReduxExample>
            
        </div>
    );
};

export default Home;