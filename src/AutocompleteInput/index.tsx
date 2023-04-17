import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

// Define the types for the options and AutocompleteProps
interface Option {
  value: string;
  label: string;
}

interface AutocompleteProps {
  url: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ url }) => {
  // Define the state variables for the options, input value, filtered options, and options menu state
  const [options, setOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Define a ref for the Autocomplete component wrapper element
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch the options from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      const options = data.map((item: any) => ({
        value: item.value,
        label: item.label,
      }));
      setOptions(options);
      setFilteredOptions(options);
    };
    fetchData();
  }, [url]);

  // Handle changes to the input value
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // If the input value is empty, set the filtered options to all available options and close the options menu
    if (value === "") {
      setFilteredOptions(options);
      setIsOpen(false);
      return;
    }

    // Filter the options to find matches based on the input value
    const matches = options.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );

    // If there are no matches, close the options menu
    if (matches.length === 0) {
      setIsOpen(false);
      return;
    }

    // If there is an exact match for the input value, set the input value to the label of the exact match, clear the filtered options, and close the options menu
    const exactMatch = matches.find(
      (option) => option.label.toLowerCase() === value.toLowerCase()
    );
    if (exactMatch) {
      setInputValue(exactMatch.label);
      setFilteredOptions([]);
      setIsOpen(false);
      return;
    }

    // Sort the matches based on their position in the label string relative to the input value and return the top 5 matches
    const sortedMatches = matches.sort(
      (a, b) =>
        a.label.toLowerCase().indexOf(value.toLowerCase()) -
        b.label.toLowerCase().indexOf(value.toLowerCase())
    );
    const filtered = sortedMatches.slice(0, 5);

    // Set the filtered options to the top 5 matches and open the options menu
    setFilteredOptions(filtered);
    setIsOpen(true);
  };

  // Handle clicks on an option in the options menu
  const handleOptionClick = (option: Option) => {
    setInputValue(option.label);
    setIsOpen(false);
  };

  // Handle clicks outside the Autocomplete component to close the options menu
  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // Add a click event listener to the document to handle clicks outside the Autocomplete component
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Define a function to highlight the matching part of the label text
  const highlightMatch = (label: string) => {
    const index = label.toLowerCase().indexOf(inputValue.toLowerCase());
    if (index < 0) {
      return label;
    }
    const prefix = label.substring(0, index);
    const suffix = label.substring(index + inputValue.length);
    const match = label.substring(index, index + inputValue.length);

    return (
      <>
        {prefix}
        <span className="highlight">{match}</span>
        {suffix}
      </>
    );
  };

  // Render the Autocomplete component
  return (
    <div className="autocomplete" ref={wrapperRef}>
      <input
        type="text"
        onChange={handleInputChange}
        value={inputValue}
        autoComplete="off"
        placeholder="Type here..."
      />
      {isOpen && (
        <div className="autocomplete-options">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className="autocomplete-option"
              onClick={() => handleOptionClick(option)}
            >
              {highlightMatch(option.label)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
