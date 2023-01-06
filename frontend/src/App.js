import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Forgot from './pages/auth/Forgot';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Reset from './pages/auth/Reset';
import Home from './pages/Home/Home';
import Layout from './components/layout/Layout'
import Dashboard from './pages/dashboard/Dashboard';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getLoginStatus } from './services/authService';
import { SET_LOGIN } from './redux/features/auth/authSlice';

// this will make sure that whenever we make a request, we are able to save the credentials

axios.defaults.withCredentials=true;

function App() {

  const dispatch=useDispatch()

  useEffect(()=>{
    async function loginStatus()
    {
      const status=await getLoginStatus()
      dispatch(SET_LOGIN(status))
    }
    loginStatus()
  },[dispatch])

  return (
    <BrowserRouter>

      <ToastContainer />
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/resetpassword/:resetToken' element={<Reset/>}/>
        <Route path='/forgot' element={<Forgot/>}/>

        <Route path='/dashboard' element=
        {
          <Sidebar>
            <Layout>
              <Dashboard/>
            </Layout>
          </Sidebar>
        }/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
