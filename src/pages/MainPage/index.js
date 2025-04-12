import React, { useState, useEffect } from 'react';
 
import styled from 'styled-components';
import { CalendarPage } from '../../pages/CalendarPage';

const MainWrapper = styled.div`
  display: flex; 
  width: 1700px;
  height: 900px;
  text-align: center; 
   
  
  > div {
    background-color: #1E1F21; 

  
  
  }

 
`
const Panel = styled.div`
  width: 30%;
  border-radius: 80px 0 0 80px;
  
`
 
const List = styled.select`
    overflow-y: auto;
   
    height: 100%;  
    width: 100%;
    background-color: #1E1F21; 
    border: 0;
    border-top-left-radius: 80px 80px;
    border-bottom-left-radius: 80px 80px;
    > {  
      option {    
        min-height:40px;  
        text-align: center;
        font-family: sans-serif;
        color:#FFF;
        background:#1E1F21; 
       
        border: 0;
      }

      option:hover {
        background:#666;
      }
  }
`

const MainWindow = styled.div`
  width: 70%;
  border-radius: 0 80px 80px 0;
`

 
 
function MainPage() {
  const [calendars, setCalendars] = useState([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const userID = "27e1651e-d1fe-4cec-a463-f859f23d3fb1";
  const [events, setEvents] = useState([]);
  const [isSelected, setSelect] = useState(false);
  const [calendarName, setName] = useState("");
  const [calendarID, setCalendarID] = useState("");
  const [dataEvents, setDataEvents] = useState([]);
  const [dataCalendars, setDataCalendars] = useState([]);
  const [fetchCompleted, setFetchCompleted] = useState(false);
 
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5051/getAllEvents');

        if (!response.ok) {
          throw new Error('HTTP error! Status: ' + response.status);
        }

        const data = await response.json();

        setEvents(data);
        if (fetchCompleted) {
        
        } else {
          setFetchCompleted(true);
        }
         
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchEvents();
  }, [fetchCompleted]); 
  
  useEffect(() => {
     const fetchCalendars = async () => {
       const response = await fetch(`http://localhost:5051/GetAllCalendars?UserId=27e1651e-d1fe-4cec-a463-f859f23d3fb1`);
       const data = await response.json();
       setDataCalendars(Object.entries(data));
  
       const newOptions = Object.values(data);
      
 
     
       setCalendars(newOptions);  
     };

     fetchCalendars();
  }, []); 
  

  const createCalendar = async (newOption) => {
    const url = 'http://localhost:5051/createCalendar';
    const data = {
      name: newOption,
      UserId: userID
    };
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const jsonData = await response.json();

    
        setDataCalendars([jsonData, newOption]);

        setCalendars([...calendars, newOption]);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addOption = () => {
    const newOption = prompt('Enter a new option:');
    if (newOption) {
      createCalendar(newOption); 
    }
  };

  const calendarChange = (e) => {
 
    const calendarid = dataCalendars[e.target.selectedIndex][0];
   
    console.log(calendarid)
    setCalendarID(calendarid)
    setDataEvents(events.filter(event => event.calendarid === calendarid));
    setSelectedOptionIndex(e.target.selectedIndex);
    setName(e.target.value);
    setSelect(true);
  };

  return (
    <MainWrapper>
       {fetchCompleted && (
      <>
        <Panel>    
          <List size="5" onChange={calendarChange}>
            {calendars.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </List>
        </Panel>
        <MainWindow> 
          <div onClick={addOption} style={{background: "red"}}> Создать календарь </div>    
          <CalendarPage 
            calendarID={calendarID} 
            calendarName={calendarName} 
            dataEvents={dataEvents}
            setDataEvents={setDataEvents}
          />
        </MainWindow>
      </>
    )}
    </MainWrapper>
  );
}

export  default  MainPage;