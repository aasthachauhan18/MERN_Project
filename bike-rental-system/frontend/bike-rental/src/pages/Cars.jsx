import { useState } from "react";
import carsData from "../data/carsData";
import CarCard from "../components/CarCard";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSiderbar";

function Cars() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filtered = carsData.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase()) &&
    (category ? car.type === category : true)
  );

  return (
    <div className="row">

      <div className="col-md-3">
        <FilterSidebar setCategory={setCategory} />
      </div>

      <div className="col-md-9">

        <SearchBar setSearch={setSearch} />

        <div className="row">

          {filtered.map((car) => (
            <div className="col-md-4 mb-3" key={car.id}>
              <CarCard car={car} />
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Cars;