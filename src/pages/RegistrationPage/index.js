 


import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import RegistrationForm from "../../components/RegistrationPage";

 
function register(userName, password, email){


    const data = {
        userName: userName,
        password: password,
        email: email
      };
      
      fetch('http://localhost:5051/register', {
        method: 'POST', 
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка сети');
        }
        
      })
      .then(data => {
        console.log('Успешная регистрация:', data); 

      })
      .catch(error => {
        console.error('Ошибка регистрации:', error); 
   
      });
      
}



function RegistrationPage() {
    const [userName, setUserName] = useState('');
    const [password, setUserPassword] = useState('');
    const [email, setEmail] = useState('');



  const changeUserName = (event) => {
    setUserName(event.target.value);
  };

  const changePassword = (event) => {
    setUserPassword(event.target.value);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };


    const navigate = useNavigate();

    const handleRegistration = () => {
        navigate('/LoginPage'); 
    };

    
    return (
       <RegistrationForm 
            isEmail={false}
            TitleButton={"Sign in"}
            TitleButton2={"Back to Sign up"}
            action2={handleRegistration}
            action1={register}
            userName={userName}
            password={password}
            email={email}
            changePassword={changePassword}
            changeLogin={changeUserName}
            changeEmail={changeEmail}

        /> 
    );
}

export { RegistrationPage };
 

 
