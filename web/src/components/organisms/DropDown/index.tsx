import React, { useState } from "react";
import "./styles.scss";

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
      <span>{label}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="dropdownIcon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
      </svg>
      {isOpen && (
        <div className="dropdownMenu">
          {options.map((option, index) => (
            <p
              key={index}
              className="dropdownOption"
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
