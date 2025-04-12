import React, { useEffect, useState } from "react";
import styled from "styled-components";

const monthOptions = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
                      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

const DatePickerWrapper = styled.div`
  left: 125px;
  position: absolute;
  display: inline-block;
  padding: 10px;
  background: #eeeeee;
  border-radius: 6px;
`;

const DatePickerSelect = styled.select`
 
  appearance: none;
 
  text-align: center;
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 6px 10px;
  background: #ffffff;
  cursor: pointer;
   
`;

function DatePicker({setDate, currentDate}) {
  const [yearsOptions, setYearsOptions] = useState([]);
  const [daysOptions, setDaysOptions] = useState([]);

   
  
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
   
  useEffect(() => {
    const today = new Date(currentDate);
     
 
    setSelectedMonth(monthOptions[today.getMonth()]);
    setSelectedDay(today.getDate().toString());
    updateDaysOptions(today.getFullYear(), today.getMonth());
    setYearsOptions(Array.from({length: 25}, (_, index) => 2005 + index));
    setSelectedYear(today.getFullYear());
  }, []);

  const updateDaysOptions = (year, monthIndex) => {
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    setDaysOptions(Array.from({ length: daysInMonth }, (_, index) => index + 1));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    updateDaysOptions(selectedYear, monthOptions.indexOf(e.target.value));
    const newDate = new Date(selectedYear, monthOptions.indexOf(selectedMonth), e.target.value);
    setDate(newDate);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    const newDate = new Date(selectedYear, monthOptions.indexOf(selectedMonth), e.target.value);
    setDate(newDate);
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  
    const newDate = new Date(selectedYear, monthOptions.indexOf(selectedMonth), e.target.value);
    setDate(newDate);
 
  };

  return (
    <DatePickerWrapper>
      <DatePickerSelect value={selectedMonth} onChange={handleMonthChange}>
        {monthOptions.map((month, index) => (
          <option key={index} value={month}>{month}</option>
        ))}
      </DatePickerSelect>
      <DatePickerSelect value={selectedYear} onChange={handleYearChange}>
        {yearsOptions.map((year, index) => (
          <option key={index} value={year}>{year}</option>
        ))}
      </DatePickerSelect>
      <DatePickerSelect value={selectedDay} onChange={handleDayChange}>
        {daysOptions.map((day, index) => (
          <option key={index}>{day}</option>
        ))}
      </DatePickerSelect>
    </DatePickerWrapper>
  );
}

export default DatePicker;