import React, { useEffect, useState } from 'react';
import './App.css';
import { Home, Mypage } from './page/index';
import { Header, LoginModal } from './component/index';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import SignUpModal from './component/modal/signupmodal';

interface ShowList {
  login: boolean,
  signin: boolean,
}
interface User {
  userId: string,
  userEm: string,
  userNm: string
}

function App() {
  const [login, setLogin] = useState<boolean>(false);
  const [show, setShow] = useState<ShowList>({
    login: false,
    signin: false
  });
  const [user, setUser] = useState<User>({
    userId: '',
    userEm: '',
    userNm: ''
  })

  useEffect(() => {
    setLogin(true);
  }, [])

  return (
    <div className="App">
      <Router>
        <Header login={login} setLogin={setLogin} setShow={setShow} />
        <Routes>
          <Route path= '/' element={<Home />} />
          {
            login 
              ? <Route path= '/mypage' element={<Mypage />} /> 
              : <Route path= '/mypage' element={<Navigate to='/'/>} />
          }
        </Routes>
        {
          show.login
            ? <LoginModal setShow={setShow} setLogin={setLogin} setUser={setUser} />
            : <></>
        }
        {
          show.signin
            ? <SignUpModal setShow={setShow}/>
            : <></>
        }
      </Router>
    </div>
  );
}

export default App;
