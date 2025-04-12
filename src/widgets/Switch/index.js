import React from 'react';
import styled from 'styled-components';

const SwitchWrapper = styled.label`
  position: relative;
  width: 62px;
  height: 35px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
 
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 15px;
 
  bottom: 10px;
  width: 62px;
  background: #ddd;
  transition: 0.4s;
  border-radius: 30px;
  border: 1px solid #ccc;

  &:before {
    position: absolute;
    content: "";
    height: 1.9em;
    width: 1.9em;
    border-radius: 16px;
    left: 1.2px;
    top: 0;
    bottom: 0;
    margin: auto;  
    background-color: white;
    box-shadow: 0 2px 5px #999999;
    transition: 0.4s;
  }

  ${HiddenCheckbox}:checked + & {
    background-color: #5fdd54;
    border: 1px solid transparent;
  }

  ${HiddenCheckbox}:checked + &:before {
    transform: translateX(1.5em);
  }
`;

const Switch = ({ isChecked, setIsChecked }) => {
  const handleChange = (event) => {
    setIsChecked(event.target.checked); 
    
  };

  return (
    <SwitchWrapper>
      <HiddenCheckbox checked={isChecked} onChange={handleChange} />
      <Slider />
    </SwitchWrapper>
  );
};

export default Switch;
