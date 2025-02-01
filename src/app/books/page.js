import Link from 'next/link';
import React from 'react';

const Books = () => {
    return (
        <div className=' flex gap-3'>
            <Link href={'/books/1'}>Book 1</Link>
            <Link href={'/books/2'}>Book 2</Link>
            <Link href={'/books/3'}>Book 3</Link>
            <Link href={'/books/4'}>Book 4</Link>
        </div>
    );
};

export default Books;