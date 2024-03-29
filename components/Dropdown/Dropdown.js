import { useState } from 'react';

function Dropdown({options, onOptionSelect}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]); // Default to the first option

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option); // Update selected option
    setIsOpen(false); // Close the dropdown after selection
    onOptionSelect(option);
  };

  // Inline styles
  const dropdownStyles = {
    position: 'relative',
    display: 'inline-block',
    marginLeft: '10px', // Example margin
  };

  const toggleButtonStyles = {
    padding: '8px',
    backgroundColor: '#fefcf3',
    border: '1px solid #ccc',
    cursor: 'pointer',
    color: '#000000'
  };

  const dropdownMenuStyles = {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#fefcf3',
    border: '1px solid #ccc',
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    minWidth: '100px',
    color: '#000000'
  };

  return (
    <div className="dropdown" style={dropdownStyles}>
      <button className="dropdown-toggle" onClick={toggleDropdown} style={toggleButtonStyles}>
        {selectedOption}
      </button>
      {isOpen && (
        <ul className="dropdown-menu" style={dropdownMenuStyles}>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
