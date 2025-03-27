"use client";

import React, { useState, useRef, useEffect } from "react";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dropdown = ({ options, onSelect, value, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(filterText.toLowerCase())
  );

  const toggleDropdown = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
    setFilterText("");
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        //size={30}
        onClick={toggleDropdown}
        name={name}
        className=" w-80 h-8 rounded-md   bg-activityList text-default-text  m-1 p-1 text-start "
      >
        {value}
      </button>
      {isOpen ? (
        <FontAwesomeIcon
          className="absolute right-1.5 top-1/2 transform -translate-y-1/2 px-4 py-2 pr-2 hover:text-neutral-500 transition cursor-pointer"
          icon={faChevronUp}
          onClick={toggleDropdown}
        />
      ) : (
        <FontAwesomeIcon
          className="absolute right-1.5 top-1/2 transform -translate-y-1/2 px-4 py-2 pr-2 hover:text-neutral-500 transition cursor-pointer"
          icon={faChevronDown}
          onClick={toggleDropdown}
        />
      )}

      {isOpen && (
        <div className="absolute flex flex-col w-96  z-10 border rounded-md  bg-activityList">
          <input
            type="text"
            placeholder="Filter..."
            value={filterText}
            onChange={handleFilterChange}
            className="h-10  border border-white "
          />
          {filteredOptions.length > 0 && (
            <ul className="w-full h-full max-h-64 pb-3 bg-activityList overflow-auto">
              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="px-3 py-2 hover:bg-activityList-hover cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
          {filteredOptions.length === 0 && (
            <span className="p-2">No options </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
