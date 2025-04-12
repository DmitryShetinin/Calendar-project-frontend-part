	 
import  { LogInPage } from "../pages/LogInPage";
import  { CalendarPage }  from "../pages/CalendarPage";
import  { RegistrationPage }  from "../pages/RegistrationPage";
import   MainPage   from "../pages/MainPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
      
            <BrowserRouter>
     
                    <Routes>
			<Route path="/" element={<LogInPage />} />
			<Route path="/MainPage" element={<MainPage />} />
                        <Route path="/LogInPage" element={<LogInPage />} />
                        <Route path="/CalendarPage" element={<CalendarPage />} /> 
			<Route path="/RegistrationPage" element={<RegistrationPage />} />                     
                    </Routes>
   
            </BrowserRouter>
       
    );
}

export default App;