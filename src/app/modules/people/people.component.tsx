import { useState, ChangeEvent, FC, Key } from "react";
import { Person } from "./model";
import { usePeopleQuery } from "./query";
import Pagination from './pagination'
import Modal from './modal'

import "./people.css";

export const People: FC = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [recordCount, setRecordCount] = useState(10);
  const [sortedAsc, setSortedAsc] = useState<'ascending' | 'descending'>(
    'ascending'
  );
  const [modalActive, setModalActive] = useState(false)
  const { data: people, loading, error, } = usePeopleQuery(page, searchValue, recordCount, sortedAsc);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onChange = (value: number) => {
    setRecordCount(value)
  }

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

  if (loading) {
    return <p>Fetching People...</p>;
  }

  if (people === undefined || error) {
    return <h2>Oops! looks like something went wrong!</h2>;
  }

  const handlesort = () => {
    setSortedAsc((prev) => (prev === 'ascending' ? 'descending' : 'ascending'))
  }

  const handlerSearch = (arr: Person[], str: string): Person[] => {
    return arr.filter((person) =>
      person.name.toLocaleLowerCase().includes(str.toLocaleLowerCase())
    )
  }

  const compareNames = (a: Person, b: Person) => {
    return a.name.localeCompare(b.name)
  }

  const first = (page - 1) * recordCount
  const last = first + recordCount
  const totalPages = people.length / recordCount
  const sortedPeople =
    sortedAsc === 'ascending'
      ? [...handlerSearch(people, searchValue)].sort(compareNames)
      : [...handlerSearch(people, searchValue)].sort((a, b) =>
        compareNames(b, a)
      )
  const handleNext = () => {
    setPage((prev) => prev + 1)
  }
  const handlePrevious = () => {
    setPage((prev) => prev - 1)
  }

  const handleLast = () => {
    setPage(Math.ceil(people.length / 10))
  }
  return (
    <>
      <div className="navBar">
        <div>
          <label htmlFor="Search">Search:</label>
          <input
            onChange={handleSearch}
            id="Search"
            role="textbox"
            aria-label="Search"
            type="text"
            name="Search"
            value={searchValue}
          />
          <div className='per-page-container'>
            Show
            <select
              role="combobox"
              className="form-control"
              value={recordCount}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                onChange(Number(event.target.value))
              }}
            >
              <option value='10'>10</option>
              <option value='15'>15</option>
              <option value='20'>20</option>
            </select>
            per page
          </div>
        </div>
        <div className="createPerson">
          <button onClick={() => setModalActive(true)}>
            Create New Person
          </button>
          <Modal
            active={modalActive}
            setActive={setModalActive}
          />
        </div>
      </div>
      {sortedPeople.length ? (
        <table id="table">
          <thead>
            <tr>
              <th
                aria-sort={sortedAsc} onClick={handlesort}>
                <button type="button" >
                  Name
                  <span aria-hidden="true"></span>
                </button>
              </th>
              <th >
                <button type="button" >Show</button>
              </th>
              <th>
                <button type="button" > Actor/Actress</button>
              </th>
              <th>
                <button type="button" > Date of birth</button></th>
              <th>
                <button type="button" > Movies</button></th>
            </tr>
          </thead>
          <tbody>
            {sortedPeople.slice(first, last).map((people: Person, index: Key | null | undefined) => (
              <tr key={index}>{renderCells(people)}</tr>
            ))}
          </tbody>
        </table>) :
        (<div>
          No People Available.
        </div>)
      }
      <Pagination
        currentPage={page}
        handlePage={setPage}
        setCurrentPage={setPage}
        filteredPeople={people}
        totalPageCount={totalPages}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handleLast={handleLast}
        itemsPerPage={itemsPerPage}
        first={first}
        last={last}
      />
    </>
  );
}
