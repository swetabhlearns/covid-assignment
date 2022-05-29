import React, { useState } from "react";

function Search({ data, handleSearch }) {
  const [search, setSearch] = useState("");

  return (
    <div>
      <form action="/" method="get">
        <label htmlFor="header-search">
          <span className="visually-hidden">Search Country</span>
        </label>
        <input
          type="text"
          id="header-search"
          placeholder="Search Country"
          name="s"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={(e) => {
            handleSearch(search);
            e.preventDefault();
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;

//
