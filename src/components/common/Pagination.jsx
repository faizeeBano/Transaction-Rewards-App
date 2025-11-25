import PropTypes from "prop-types";

function Pagination({ currentPage = 0, totalPages = 0, onPageChange }) {
  function handlePrev() {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  function handleNext() {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
