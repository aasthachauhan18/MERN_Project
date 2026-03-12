function FilterSidebar({ setCategory }) {
  return (
    <div>

      <h5>Filter Cars</h5>

      <button
        className="btn btn-outline-primary w-100 mb-2"
        onClick={() => setCategory("SUV")}
      >
        SUV
      </button>

      <button
        className="btn btn-outline-primary w-100 mb-2"
        onClick={() => setCategory("Sedan")}
      >
        Sedan
      </button>

      <button
        className="btn btn-outline-primary w-100"
        onClick={() => setCategory("")}
      >
        All
      </button>

    </div>
  );
}

export default FilterSidebar;