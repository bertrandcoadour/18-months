import React, { useState, useRef, useEffect } from "react";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Dropdown({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(""); // For the input value
  const [filteredOptions, setFilteredOptions] = useState(options); // For filtering
  const dropdownRef = useRef(null); // Ref for outside click handling

  useEffect(() => {
    // Filter options based on input value
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [inputValue, options]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsOpen(true); // Open dropdown on input change
  };

  const handleOptionClick = (option) => {
    setInputValue(option); // Set input value to selected option
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <div className="relative" onClick={toggleDropdown}>
        <input
          type="text"
          className="inline-flex items-center justify-center rounded-md text-sm border border-[#2a524b] h-10 px-4 py-2"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type to search..." // Placeholder text
          onClick={toggleDropdown} // Keep dropdown open on input click
        />
        <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && filteredOptions.length > 0 ? ( // Show only if filtered options exist
        <div className="absolute left-1/2 -translate-x-1/2 top-15 z-1000">
          <ul className="w-56 h-auto shadow-md rounded-md p-1 border bg-activityList">
            {filteredOptions.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`relative flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 rounded-md`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      ) : isOpen && filteredOptions.length === 0 ? (
        <div className="no-options">No options found.</div>
      ) : null}
    </div>
  );
}

export default Dropdown;
