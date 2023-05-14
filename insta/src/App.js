// import logo from './logo.svg';
import './App.css';
// import Navbar from './navbar/index'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import { Index } from './loginpage';
import { NotFound } from './notfound';
import { Userprofile } from './home/userprofile';
import { Navbar } from './home/navbar';

function App() {
  return (
    <>
    {/* <Navbar></Navbar> */}
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index/>} />
      <Route path="/home" element={<Navbar/>} />
      <Route path="/userprofile" element={<Userprofile/>} />

      <Route path='*' element={<NotFound/>} />
    </Routes>
  </BrowserRouter>
    </>
  );
}

export default App;
