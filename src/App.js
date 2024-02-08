import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import Verify from './Components/Verify/Verify';
import Home from './Components/Home/Home';
import Forgot from './Components/ForgotPassword/Forgot';
// import store from './Redux/Store/Store';
// import { useSelector } from 'react-redux';
import ResetPassword from './Components/ForgotPassword/ResetPassword';

// store.subscribe(() => { console.log(store.getState()) })
// console.log(process.env.REACT_APP_SERVER)

function App() {
  // const myStore = useSelector((store) => store.userReducer)

  // const isEmailV = localStorage.getItem('EV');
  // const isLoginV = localStorage.getItem('LV');
  const email = localStorage.getItem('email');
  // console.log(isEmailV, isLoginV);

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={email ? <Navigate to='/home' /> : <Login />} />
        <Route path='/register' element={email ? <Navigate to='/home' /> : <SignUp />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/home' element={(<Home />)} />
        <Route path='/forgot-password' element={<Forgot />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
