import logo from './logo.svg';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import Data from './components/Data';
import List from './components/List';
import Admin_page from './components/Admin_page';
import User_page from './components/User_page';
import Bucket from './components/Bucket';
import HomeAdmin from './components/HomeAdmin';
import HomeContractor from './components/HomeContractor';
import Upload from './components/Upload';
import './App.css';
import {
  BrowserRouter as
    Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path = '/' element={<Home/>}/>
        <Route path = '/signup' element={<Signup/>}/>
        <Route path = '/signin' element={<Signin/>}/>
        <Route path = '/data' element={<Data/>}/>
        <Route path = '/list' element={<List/>}/>
        <Route path = '/admin' element={<Admin_page/>}/>
        <Route path = '/user' element={<User_page/>}/>
        <Route path = '/bucket' element={<Bucket/>}/>
        <Route path = '/home1' element={<HomeAdmin/>}/>
        <Route path = '/home2' element={<HomeContractor/>}/>
        <Route path = '/upload' element={<Upload/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
