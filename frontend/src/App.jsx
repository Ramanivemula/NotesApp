import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home'
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';

const routes = (
  <Router>
    <Routes>
      <Route path='/Home' exact element={<Home/>}/>
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/signup' exact element={<SignUp/>}/>
    </Routes>
  </Router>
);

function App() {
  return (
    <div >{routes}</div>
  )
}

export default App