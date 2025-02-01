import React from 'react';

const Book = ({params}) => {
    const {id}=params
    return (
        <div>
            book no : {id}
        </div>
    );
};

export default Book;