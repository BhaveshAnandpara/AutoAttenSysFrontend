import './App.css';
import Enrollment from './Pages/Enrollment/Enrollment'
import TakeAttendance from './Pages/TakeAttendance/TakeAttendance';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Attendance from './Pages/Attendance/Attendance';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/attendance' element={ <Attendance/> } />
        <Route exact path='/enrollUser' element={ <Enrollment/> } />
        <Route exact path='/takeAttendance' element={ <TakeAttendance/> } />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
