import React, { useEffect, useState } from 'react';
import './App.css';
import { Home, Mypage } from './page/index';
import { Header, LoginModal } from './component/index';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import SignInModal from './component/modal/signinmodal';
interface ShowList {
  login: boolean,
  signin: boolean,
}

function App() {
  const [login, setLogin] = useState<boolean>(false);
  const [show, setShow] = useState<ShowList>({
    login: false,
    signin: false
  });
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
            ? <LoginModal/>
            : <></>
        }
        {
          show.signin
            ? <SignInModal />
            : <></>
        }
      </Router>
    </div>
  );
}

export default App;
