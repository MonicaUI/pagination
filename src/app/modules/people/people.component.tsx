import { useState, useEffect } from "react";
import { Person, PeopleQueryState } from "./model";
import { usePeopleQuery } from "./query";

import "./people.css";

export function People() {
  const { data: people, loading, error } = usePeopleQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPeople, setFilteredPeople] = useState<Person[] | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (!searchTerm) {
      setFilteredPeople(people);
    } else {
      setFilteredPeople(
        people?.filter((person) =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, people]);

  const renderCells = ({ name, show, actor, movies, dob }: Person) => (
    <>
      <td>{name}</td>
      <td>{show}</td>
      <td>{actor}</td>
      <td>{dob}</td>
      <td
        dangerouslySetInnerHTML={{
          __html: movies.map(({ title }) => title).join(", "),
        }}
      ></td>
    </>
  );

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <p>Fetching People...</p>;
  }

  if (people === undefined || error) {
    return <h2>Oops! looks like something went wrong!</h2>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPeople?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((filteredPeople?.length || 0) / itemsPerPage);

  return (
    <>
      {filteredPeople && filteredPeople.length > 0 ? (
        <div>
          Showing {filteredPeople.length} out of {people?.length} results
        </div>
      ) : (
        <div>No People Available.</div>
      )}
      <label>Search:</label>
      <input
        type="text"
        id="Name"
        name="Name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Show</th>
            <th>Actor/Actress</th>
            <th>Date of birth</th>
            <th>Movies</th>
          </tr>
        </thead>

        <tbody>
          {currentItems?.map((person, index) => (
            <tr key={index}>{renderCells(person)}</tr>
          ))}
        </tbody>
      </table>
      {/* <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button key={pageNumber} onClick={() => handlePageClick(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div> */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={pageNumber === currentPage ? "selected-page" : ""}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </>
  );
}
