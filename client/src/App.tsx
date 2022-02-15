import React from 'react';
import './App.css';
import { Home, Mypage } from './page/index';
import { Header } from './component/index';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Header login={true}  />
        <Routes>
          <Route path= '/' element={<Home />} />
          <Route path= '/mypage' element={<Mypage />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
