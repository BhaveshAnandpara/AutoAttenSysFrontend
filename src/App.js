import './App.css';
import EnrollUser from './Pages/EnrollUser';
import { BrowserRouter, Routes , Route } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/enrollUser' element={ <EnrollUser/> } />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
