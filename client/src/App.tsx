import React from 'react';
import './App.css';
import { Mypage } from './page/index'
import Header from './component/header';


function App() {
  return (
    <div className="App">
      <Header login={true}  />
      <Mypage />
      
    </div>
  );
}

export default App;
