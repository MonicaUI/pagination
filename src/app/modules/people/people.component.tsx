import { useState, useEffect, useRef } from "react";
import { Person, PeopleQueryState } from "./model";
import { usePeopleQuery } from "./query";

import "./people.css";

export function People() {
  const { data: people, loading, error } = usePeopleQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPeople, setFilteredPeople] = useState<Person[] | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const itemsPerPageRef = useRef(null);
  const itemsPerPageOptions = [10, 15, 20];

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

  const peopleShownText = `Showing ${indexOfFirstItem + 1}-${
    indexOfLastItem > filteredPeople?.length ? filteredPeople?.length : indexOfLastItem
  } of ${people?.length}`;

  const itemsPerPageSelect = (
    <select
      ref={itemsPerPageRef}
      onChange={() => {
        setCurrentPage(1);
        setItemsPerPage(parseInt(itemsPerPageRef.current.value));
      }}
    >
      {itemsPerPageOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  const navigationButtons = (
    <div>
      <button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
      >
        First
      </button>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <button
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );

  return (
    <>
      {filteredPeople && filteredPeople.length > 0 ? (
        <div>{peopleShownText}</div>
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
      <div>
        <label>Items per page:</label>
        {itemsPerPageSelect}
      </div>
      {navigationButtons}
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

