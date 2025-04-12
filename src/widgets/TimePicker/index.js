import React, { useState } from 'react';
import styled from 'styled-components';

const TimePickerWrapper = styled.div`
  position: relative;
  
  left: 5px;
 
  padding: 10px;
  background: #eeeeee;
  border-radius: 6px;
`;

const TimePickerSelect = styled.select`
 
  appearance: none;
  outline: none;
  text-align: center;
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 6px;
  background: #ffffff;
  cursor: pointer;
  font-family: 'Heebo', sans-serif;
`;

function TimePicker() {
  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(0);

  const handleHourChange = (event) => {
    setHour(parseInt(event.target.value, 10));
  };

  const handleMinuteChange = (event) => {
    setMinute(parseInt(event.target.value, 10));
  };

  return (
    <TimePickerWrapper>
      <TimePickerSelect value={hour} onChange={handleHourChange}>
        {Array.from({ length: 23 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {(i + 1).toString().padStart(2, '0')}
          </option>
        ))}
      </TimePickerSelect>
      :
      <TimePickerSelect value={minute} onChange={handleMinuteChange}>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i * 5} value={i * 5}>
            {(i * 5).toString().padStart(2, '0')}
          </option>
        ))}
      </TimePickerSelect>
    </TimePickerWrapper>
  );
}

export default TimePicker;
