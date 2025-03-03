import React from "react";
import { Movie } from "../../../models/models";
import "./styles.scss";

interface PaginationProps {
  movies: Movie[];
  totalCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  movies,
  totalCount,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalCount / 10);
  console.log(totalCount);
  return (
    <div className="movies-pagination">
      {movies && (
        <div className="pagination">
          {/* <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>
          <p>Jump to</p> */}
          {/* <input
            type="text"
            className="jump-to-input"
            value={jumpToPage}
            onChange={(e) => setJumpToPage(e.target.value)}
            onKeyDown={handleJumpToPage}
            placeholder="Enter page number"
          /> */}
          {[...Array(totalPages)].map((_, index) => (
            <p
              key={index}
              onClick={() => {
                setCurrentPage(index + 1);
                console.log(index);
              }}
              className={`${currentPage === index + 1 ? "active-page" : ""}`}
            >
              {index + 1}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pagination;
