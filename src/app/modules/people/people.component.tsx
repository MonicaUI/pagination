import { useState, useEffect } from "react";
import { Person, PeopleQueryState } from "./model";
import { usePeopleQuery } from "./query";


import "./people.css";

export function People() {
  const { data: people, loading, error, visible } = usePeopleQuery();
  const [peopleData, setPeopleData] = useState<Person[] | undefined>()

  const handleSearch = () => {
    const input = document.getElementById(
      'Name',
    ) as HTMLInputElement;
    if (input !== null) {
    }
  }

  useEffect(() => setPeopleData(people), [peopleData]);

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


  return (
    <>
      <div>No People Available.</div>
      <label >Search:</label>
      <input type="text" id="Name" name="Name" ></input>
      <button onClick={() => handleSearch()}>Search</button>
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
          {people.slice(0, visible).map((people, index) => (
            <tr key={index}>{renderCells(people)}</tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
