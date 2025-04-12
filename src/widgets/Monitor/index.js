import React from "react";
 
import './style.css'
 
 
 


const Monitor = ({ today, prevHandler, todayHandler, nextHandler, openModalEvent, calendarName }) => (
  <div className="header">
    <div className="buttons-wrapper">
      <span className={`date-text ${today.format('MMM') ? '' : 'bold'}`}>
        {today.format('MMM')}
      </span>
      <span className="date-text bold">{today.format('YYYY')}</span>
      <div className="event" onClick={openModalEvent}>+</div>
      <span className="date-text bold">Название календаря: {calendarName}</span>
    </div>

    <div className="buttons-wrapper">
      <button type="button" className="button-base" onClick={prevHandler}>&lt;</button>
      <button type="button" className="button-base today-wrapper" onClick={todayHandler}>today</button>
      <button type="button" className="button-base" onClick={nextHandler}>&gt;</button>
    </div>
  </div>
);


export default Monitor; 