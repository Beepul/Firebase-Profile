import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddEditUser from './pages/AddEditUser';
import NavBar from './components/NavBar';
import Sign from './pages/Sign';
import Log from './pages/Log';
import { useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';



function App() {
  const {isLoggedin, user} = useSelector(state => state.auth);
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home isLoggedin={isLoggedin} user={user}/>} />
        <Route path='/add' element={<PrivateRoute isLoggedin={isLoggedin} user={user} component={AddEditUser} />} />
        <Route path='/update/:id' element={<PrivateRoute isLoggedin={isLoggedin} user={user} component={AddEditUser} />}/>
        <Route path='/signup' element={<Sign />} />
        <Route path='/login' element={<Log />} />
      </Routes>
     
    </div>
    </BrowserRouter>
  );
}

export default App;
