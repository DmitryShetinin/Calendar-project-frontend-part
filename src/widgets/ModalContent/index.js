
import Switch from '../Switch';
import TimePicker from '../TimePicker';
import DatePicker from '../DataPicker';
import moment from "moment";
import { ModalContent, HeaderEvent, Input, Wrapper, CustomSelect } from './StyledComponents'; // Предполагаемое место хранения стилей
 


const Zxc = ({ closeModalEvent, setNameEvent, 
      setDiscriptionEvent,  setIsChecked ,selectRef,users, isChecked,
      setStartDate,  setEndDate,  action, actionTitle, date ,  nameEvent, discriptionEvent}) => {
   
        
       
  return (    
    <ModalContent>
      <HeaderEvent> 
        <div className="cancel" onClick={closeModalEvent}> Отменить </div>
        <div className="bold-text"> Событие </div>
        <div onClick={action} > {actionTitle} </div>
      </HeaderEvent>
      <Wrapper>           
        <Input> 
          <input type="text" placeholder="Name" value={nameEvent}  onChange={(e) => {setNameEvent(e.target.value) }}/>
        </Input>
        <Input>
          <input type="text" placeholder="Discription" value={discriptionEvent} onChange={(e) => {setDiscriptionEvent(e.target.value) }}  />
        </Input>          
      </Wrapper>
      <Wrapper>
          <div> 
            <Input> 
            Весь день  
            </Input>
            <Switch setIsChecked={setIsChecked} isChecked={isChecked}/>
          </div>
          <div> 
            <Input> 
            Начало   
            </Input>    
            <TimePicker/>
            <DatePicker setDate={setStartDate} currentDate={date.startdate || moment()}/>
          </div>   
            <div> 
            <Input> 
            Конец   
            </Input>
            <TimePicker/> 
            <DatePicker setDate={setEndDate} currentDate={date.enddate || moment()}/>
          </div>                    
        </Wrapper>
        <Wrapper>
        <div style={{
                   
                      height: 'auto', 
                      width: '400px'
                    }}>
              <Input> 
              Участники   
              </Input>
              <CustomSelect ref={selectRef}
                  isMulti  
                  options={users}
                  
                  
                />
            </div>
        </Wrapper>
    </ModalContent>
  );
};

export default Zxc;
