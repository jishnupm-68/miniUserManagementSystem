const Pagination = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onPageClick,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-end items-center gap-2 mt-4">
      <button
        className="btn btn-sm"
        disabled={currentPage === 1}
        onClick={onPrev}
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => onPageClick(page)}
            className={`btn btn-sm ${
              currentPage === page ? "btn-primary" : "btn-outline"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        className="btn btn-sm"
        disabled={currentPage === totalPages}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
