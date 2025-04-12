

// StyledComponents.js
import styled from 'styled-components';
import Select from 'react-select';

export const CustomSelect = styled(Select)`
    margin:15px;
    left: 15px;
    width: 450px;
`


export const ModalContent = styled.div`
  width: 450px;
  height: auto;
  background-color: #f3f2f8;
  padding: 20px;
  border-radius: 15px;
`;

export const HeaderEvent = styled.div`
  display: flex;
  justify-content: space-between;

  .cancel {
    color: red;
  }

  .bold-text {
    font-weight: bold;
  }
`;

export const Input = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 42px;
  margin-left: 15px;
  
  input {
    outline: 0;
    border: 0;
    font-size: 17px; 
  }
`;

export const Wrapper = styled.div`
  position: relative;
  border-radius: 8px;
  background-color: white;
  margin-top: 20px;
  display: table;
  width: 100%; 

  > div:not(:last-child)  {
    content: "";
    border-bottom: 1px solid #f3f2f8;
  }

  > div {
    display: flex;
    align-items: center; 
    height: 55px;
  }
`;