import React, { useState, useEffect, useRef } from 'react';
import moment from "moment";
import styled from 'styled-components';
import  Header  from '../../widgets/Header';
import  Monitor  from '../../widgets/Monitor';
import  CalendarGrid  from '../../widgets/CalendarGrid';
import Zxc from "../../widgets/ModalContent";
import './index.css'

 

 



function CalendarPage({calendarName, calendarID, dataEvents}) {
  moment.updateLocale('en', { week: { dow: 1 } });
  const [today, setToday] = useState(moment());
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(dataEvents)
   
  }, []); 

  const startDay = today.clone().startOf('month').startOf('week');

  const [nameEvent, setNameEvent] = useState();
  const [discriptionEvent, setDiscriptionEvent] = useState();
  const selectRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [DateStartValue, setDateStart] = useState(new Date()); 
  const [DateEndValue, setDateEnd] = useState(new Date()); 
  const handlePrev = () => setToday(prev => prev.clone().subtract(1, 'month'));
  const handleToday = () => setToday(moment());
  const handleNext = () => setToday(prev => prev.clone().add(1, 'month'));

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };



  const createEvent = async () => {
    try {
      const selectedValue = selectRef.current.state.ariaSelection.value;
      const s = [];
      selectedValue.map(e => {
        s.push(e.label);
      });
  
      const userid = localStorage.getItem('CurrentUser');
      const DateStartValue1 = moment(DateStartValue).format("YYYY-MM-DD");
      const DateEndValue1 = moment(DateEndValue).format("YYYY-MM-DD");
    
      const data = {
        userid: userid.toString(),
        event1: crypto.randomUUID(),
        calendarid: calendarID.toString(),
        name: nameEvent,
        discriotion: discriptionEvent,
        allday: isChecked,
        startdate: DateStartValue1,
        enddate: DateEndValue1,
        participants: s,
        reminder: "1"
      };
      console.log(data)
      const url = 'http://localhost:5051/createEvent';
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        closeModal();
        console.log('Data sent successfully');
        setEvents([...events, data]);
        console.log(data);
        
      } else {
        console.error('Error sending data');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }  
   
  };

 useEffect(() => {
    const fetchUsers = async () => {

      try {
        const response = await fetch('http://localhost:5051/GetAllUsers');

        if (!response.ok) {
          throw new Error(`Ошибка запроса: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.map(user => ({ value: user, label: user }))); 
      } catch (error) {
  
      } finally {
  
      }
    };

    fetchUsers();
 }, []);
 
  useEffect(() => {
    setEvents((dataEvents || [] ).filter(e => e.calendarid === calendarID));
  }, [calendarID]); 
  
  return (
    <div  class="main-wrapper">
      <Header />
      <Monitor 
          calendarName={calendarName}
          today={today}
          prevHandler={handlePrev}
          todayHandler={handleToday}
          nextHandler={handleNext}
          openModalEvent={openModal}
      />
      <CalendarGrid startDay={startDay} today={today} 
      data={events} calendarID={calendarID} closeModal={closeModal}/>

    <div className="modal-overlay" style={{ display: isModalOpen ? 'flex' : 'none' }}>
          <Zxc 
          setNameEvent={setNameEvent}
          setDiscriptionEvent={setDiscriptionEvent}
          closeModalEvent={closeModal}  selectRef={selectRef}
          isChecked={isChecked} users={users} 
          setEndDate={setDateEnd} 
          setStartDate={setDateStart}  
          setIsChecked={setIsChecked}
          action={createEvent} actionTitle={"Добавить"}
          date={[]} />
      </div>
    </div>
  );
}

export { CalendarPage };