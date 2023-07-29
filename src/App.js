import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import Verify from './Components/Verify/Verify';
import Home from './Components/Home/Home';
import Forgot from './Components/ForgotPassword/Forgot';
import store from './Redux/Store/Store';

store.subscribe(() => {console.log(store.getState())})

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/home' element={<Home />} />
        <Route path='/reset-link' element={<Forgot />} />
      </Routes>
    </div>
  );
}

export default App;
