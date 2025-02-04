import React, { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Functional component
const SearchBar = ({ isActive }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const params = useSearchParams();

  React.useEffect(() => {
    if (isActive == null) {
      setQuery("");
    }
  }, [isActive]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updatedQuery = {
        ...currentQuery,
        search: query,
      };

      const url = qs.stringifyUrl(
        {
          url: "/activities",
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [query, params, router]
  );

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <form
      //className="flex items-center border border-slate-500 rounded"
      className="flex items-center"
      onSubmit={handleSubmit}
    >
      <div className="relative w-full">
        <input
          //className="flex-grow h-full "
          type="text"
          value={query}
          size={35}
          onChange={handleInputChange}
          placeholder="Search an activity..."
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 transform -translate-y-1/2 px-4 py-2 pr-2 hover:text-neutral-500 transition cursor-pointer"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
