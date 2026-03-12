function Pagination({ totalPages, currentPage, setPage }) {

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-4">

      {pages.map((p) => (
        <button
          key={p}
          className={`btn me-2 ${
            currentPage === p ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}

    </div>
  );
}

export default Pagination;