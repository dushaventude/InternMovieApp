import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ResponsiveDatePicker.scss"; // Import SCSS file

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="date-picker-container">
      <h2>Select a Date</h2>
      <ReactDatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
        className="responsive-date-picker"
      />
    </div>
  );
};

export default CustomDatePicker;
