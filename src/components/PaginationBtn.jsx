import React from "react";

const PaginationBtn = ({ currentPage, totalPages, onPageChange }) => {
  // Handle Previous and Next button click
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Handle page number click
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="flex flex-wrap items-center justify-center space-x-2  my-4">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-4 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages).keys()].map((number) => (
        <button
          key={number + 1}
          onClick={() => handlePageClick(number + 1)}
          className={`px-4 py-1 rounded ${
            currentPage === number + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          {number + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationBtn;
