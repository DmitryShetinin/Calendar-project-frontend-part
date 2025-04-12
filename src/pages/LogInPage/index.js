 

 
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import RegistrationForm from "../../components/RegistrationPage";





 
 
function Autorization(email, password) {

    const data = {
      email: email,
      password: password,
    };
  

     
    return fetch('http://localhost:5051/login', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error('Ошибка сети');
      }
      return response.json(); 
    })
    .then(data => { 
 
      localStorage.setItem('CurrentUser', data)
      return true;
    })
    .catch(error => {
      console.log('Ошибка:', error); 
      throw error;
    });
  }
  

 

function LogInPage () {

    const navigate = useNavigate();
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 
    const handleLogin = async () => {
        try {
          const isAuthorized = await Autorization(email, password);
          if (isAuthorized) {

            navigate('/MainPage');
          } else {
            console.log("Ошибка авторизации");
          }
        } catch (error) {
          console.log("Ошибка:", error); 

        }
                      
        
    };

   

    const changeLogin = (event) => {
      setEmail(event.target.value);
    };

    const changePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleRegestration = () => {
      navigate('/RegistrationPage'); 
  };
 
     
    return(       
        <RegistrationForm       
        password={password} 
        userName={email}
        email={email} isEmail={true}  
        changeLogin={changeLogin}
        action1={handleLogin}
        action2={handleRegestration}
        changePassword={changePassword}
        TitleButton={"Sign in"}
        TitleButton2={"Sign up"}

        />  
      
    );
}

export { LogInPage };
