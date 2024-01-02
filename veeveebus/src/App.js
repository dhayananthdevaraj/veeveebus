import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Bus from './components/Bus';
import ViewBus from './components/ViewBus';
import NavBar from './components/NavBar';
import About from './components/About';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/bus" element={<Bus/>}  />
          <Route path="/viewbus" element={<ViewBus/>} />
        </Routes>
        <About />
      </div>
    </Router>
  );
}

export default App;
