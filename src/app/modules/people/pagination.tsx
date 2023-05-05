import React from "react";
import { Person } from "./model";
import './pagination.css'

interface Props {
  currentPage: number;
  filteredPeople: Person[];
  totalPageCount: number;
  itemsPerPage: number;
  first: number;
  last: number;
  handleNext: (e: React.MouseEvent) => void;
  handlePage: (page: number) => void;
  handlePrevious: (e: React.MouseEvent) => void;
  handleLast: (e: React.MouseEvent) => void;
  setCurrentPage: (page: number) => void;
}
const Pagination: React.FC<Props> = ({
  currentPage,
  filteredPeople,
  totalPageCount,
  itemsPerPage,
  first,
  last,
  setCurrentPage,
  handleNext,
  handlePage,
  handlePrevious,
  handleLast,
}) => {

  const peopleShownText = `Showing ${first + 1}-${last > filteredPeople.length ? filteredPeople.length : last
    } of ${filteredPeople.length}`;

  const totalPages = Math.ceil((filteredPeople?.length || 0) / itemsPerPage);

  return (
    <div className="pagination-button-wrapper">
      <span className="pagination-page-info">
        {peopleShownText}
      </span>
      <button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
      >
        First
      </button>
      <button
        className="pagination-button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >Previous</button>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePage(pageNumber)}
            className={pageNumber === currentPage ? "selected-page" : ""}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        className="pagination-button"
        onClick={handleNext}
        disabled={totalPageCount <= currentPage}
      >Next</button>
      <button
        className="pagination-button"
        onClick={handleLast}
        disabled={totalPageCount <= currentPage}
      >Last</button>
    </div>
  );
};

export default Pagination;
