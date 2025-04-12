 
 
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
 


 
const Container = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    height: 610px; 
    width: 640px;
    box-shadow: 0 11px 34px 0 rgba(0,0,0,.2);
    border-radius: 34px;
    background-color: #fff;

`

const Box = styled.div `
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;

`

const Logo = styled.img `
    width: 100px;
    cursor: pointer;
    margin: 12px 0;

`

const P = styled.p `
    font-size: 26px;
    font-weight: bold;
`


const P1 = styled.p `
    font-size: 15px;
    margin-top: 8px;
` 

const Input = styled.div `
    display: flex;
    align-items: center;
    width: 300px;
    height: 42px;
    border: 2px solid #ccc;
    border-radius: 8px;
    margin-top: 12px;
    display: ${props => props.isEmail ? 'none' : 'flex'};
    input {
        outline: 0;
        border: 0;
        font-size: 17px;
        width: 100%;
        padding: 5px 8px;
        background-color: transparent;
    }

    img {
        width: 25px;
        margin-right: 10px;
        cursor: pointer;
    }
`

const Button = styled.button `
    width: 300px;
    border: 0;
    background-color: #ccc;
    margin-top: 12px;
    font-size: 18px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 12px;
    cursor: pointer;
   
    img {
        width: 20px;
        margin-right: 5px;
    }
`


 
 
 
 
 



const RegistrationForm = ({handleLogin, password, email, isEmail, userName,
    changeLogin, changePassword, changeEmail, TitleButton,TitleButton2, action1, action2 }) => {

     
    
 
 

   
    
    return(       
        <Container>
            <Box>
                <Logo/>
                <P>Apple ID</P>
                <P1 className="p1">Manage to Account</P1>
                <Input>
                    <input type="text" placeholder="UserName" value={userName} 
                            onChange={changeLogin} />
               
                </Input>
                <Input>
                    <input type="text" placeholder="Password" value={password} 
                            onChange={changePassword} />
              
                </Input>
                <Input isEmail={isEmail}>
                    <input type="text" placeholder="Email" value={email}  
                            onChange={changeEmail} />
         
                </Input>
                    
                
                <Button onClick={() => action1(userName, password, email)}> {TitleButton} </Button>

                <Button onClick={action2}>  {TitleButton2} </Button>   
            
        
            </Box>
        </Container> 
         
    );
}

export default RegistrationForm;
 
