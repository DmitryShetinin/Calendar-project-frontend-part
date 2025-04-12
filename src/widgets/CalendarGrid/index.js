 
import moment from "moment";
import React, { useState, useRef, useMemo, useEffect } from 'react';
import styled from 'styled-components';
 


import Zxc from "../ModalContent";
 


const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    > span {
        text-align: right; 
        color: #DDDCDD; 
        padding-right: 10px;
      }
     
`;

const CellWraper = styled.div`
    min-width: 140px; 
    min-height: 88px; 
    color: #DDDCDD;
    background-color: ${props => props.isWeekend ? '#272829' : '#1E1F21'};
    
    color: ${props => props.isSelectedMonth ? 'DDDDDD' : '#555759'};
    border: 1px solid #4D4C4D;
`;

const RowInCell = styled.div`
    display: flex; 
    justify-content: flex-end};
    
`;

const DayWrapper = styled.div`
    width: 10px; 
    height: 10px; 
    padding: 15px;
    background-color:  ${props => props.CurrentDay ? 'red' : ''};
    border-radius: 50%; 
    margin-top: 5px;
    margin-right: 5px;
    display: flex; 
    align-items: center; 
    justify-content: center; 
`;

 

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
`;


const EventListWrapper = styled('ul')`
margin: 0;
padding: 0;
list-style: none;
`;

 

const EventItemWrapper = styled('button')`
  position: relative;
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 114px;
  border: unset;
  color: #DDDDDD;
  cursor: pointer;
  margin-top: 1px;
  padding: 0;
  text-align: left;
  background-color: #5d5f63;
  border: 1px solid #5d5f63;
  border-radius: 2px;
`;


 



const CalendarGrid = ({startDay, today, data, calendarID }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
 
     
    const selectedDay = useRef(null);
    const [nameEvent, setNameEvent] = useState();
    const [discriptionEvent, setDiscriptionEvent] = useState();
    const selectRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [DateStartValue, setDateStart] = useState(new Date()); 
    const [DateEndValue, setDateEnd] = useState(new Date()); 
    const [dataDay, setData] = useState();
  
    
 
    
    const totalDays = 42;
    const day = startDay.clone().subtract(1, 'day'); 
    const daysArrays = [...Array(totalDays)].map(() => day.add(1,'day').clone());
   
    const array = daysArrays.map((day) => [day, isEvent(day)])
   
    
      
    function isEvent(day) {
        const dayMoment = (moment(day.format("YYYY-MM-DD"))).format("YYYY-MM-DD");
      
        const elementEvents = [];
     
        for (const element of data) {   
            
            if (moment(element.startdate).isSame(dayMoment)) {  
                elementEvents.push(element);
            }
        }   
        return elementEvents;
    }



    const openModal = (dayItem) => {
        selectedDay.current = dayItem;
    
        setUsers(dayItem.participants.map(user => ({ value: user, label: user }))); 
        console.log(users)
        setNameEvent(dayItem.name)
        setDiscriptionEvent(dayItem.discriotion)
        setIsChecked(dayItem.allday);
        setDateStart(dayItem.startdate)
        setDateEnd(dayItem.enddate)
        setIsModalOpen(true);  
        setData(dayItem)
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const UpdateEvent = async () => {
        try {
          const selectedValue = selectRef.current.state.ariaSelection;
      
          const s = [];
          console.log(selectedValue)
          if (selectedValue !== null) {
            selectedValue.value.forEach(e => {
              s.push(e.label);
            });
          } else {
            console.log("selectedValue is null");
          }
      
          const userid = localStorage.getItem('CurrentUser');
      
          const data = {
            userid: "27e1651e-d1fe-4cec-a463-f859f23d3fb1",
            event1: selectedDay.current.event1,
            calendarid: calendarID.toString(),
            name: nameEvent,
            discriotion: discriptionEvent,
            allday: isChecked,
            startdate: DateStartValue,
            enddate: DateEndValue,
            participants: s,
            reminder: "1"
          };
      
          const url = 'http://localhost:5051/updateEvents';
      
          
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
      
          if (response.ok) {
              Object.assign(selectedDay.current, data);
              closeModal();
              console.log('Data update successfully');
          } else {
       
          }
        } catch (error) {
 
        }
      };

 

    
    
   
    const renderRowInCell = useMemo(() => (dayItem) => {
        
        return (
            <RowInCell>
                <DayWrapper CurrentDay={isCurrentDay(dayItem)}>
                    {dayItem.format('D')}
                </DayWrapper>
            </RowInCell>
        );
    }, []);

    


   

    
    const isCurrentDay = (day) => moment().isSame(day, 'day');
    const isSelectedMonth = (day) => today.isSame(day, 'month');
     
    

    
    return (
        <GridWrapper>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((dayName) => (
                <span key={dayName}>{dayName}</span>
            ))}

            {
                array.map((dayItem) => {  
                    return ( 
                        <CellWraper 
                            isWeekend={dayItem[0].day() === 6 || dayItem[0].day() === 0}
                            isSelectedMonth={isSelectedMonth(dayItem[0])}> 
                            {renderRowInCell(dayItem[0])}                        
                            <EventListWrapper>
                                {   
                                          
                                    dayItem[1].length > 2 ? (
                                        <EventItemWrapper>
                                        show more...
                                        </EventItemWrapper>                      
                                    ) : dayItem[1].map(e => (     
                                        <EventItemWrapper onClick={() => openModal(e)}>
                                            {e.name}
                                        </EventItemWrapper>
                                    
                                    )) 
                                }   
                            </EventListWrapper> 
                        </CellWraper>
                    );
                })}

            
 
           {
           isModalOpen && selectedDay && (
                
            <ModalOverlay isOpen={isModalOpen}>
                <Zxc 

                nameEvent={nameEvent}
                discriptionEvent={discriptionEvent}
                setNameEvent={setNameEvent}
                setDiscriptionEvent={setDiscriptionEvent}
                closeModalEvent={closeModal}  selectRef={selectRef}
                isChecked={isChecked} users={users} 
                setEndDate={setDateEnd} 
                setStartDate={setDateStart}  
                setIsChecked={setIsChecked}
                action={UpdateEvent} actionTitle={"Обновить"}
                date={dataDay} />
            </ModalOverlay>
            )}

        </GridWrapper>

    
    );
};
 

export default CalendarGrid