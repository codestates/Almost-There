import { useEffect, useState } from 'react';
import './App.css';
import { Home, Mypage } from './page/index';
import { Header, LoginModal } from './component/index';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import SignUpModal from './component/modal/signupmodal';
import axios from 'axios';
import url from './url';

interface ShowList {
  login: boolean,
  signin: boolean,
}
interface User {
  userId: string,
  email: string,
  name: string
}

function App() {
  const [login, setLogin] = useState<boolean>(false);
  const [show, setShow] = useState<ShowList>({
    login: false,
    signin: false
  });
  const [user, setUser] = useState<User>({
    userId: '',
    email: '',
    name: ''
  })

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get(`${url}/user/info`, { withCredentials: true });
        const {userId, name, email} = res.data.user;
        setUser({
          userId,
          name,
          email
        })
      } catch (err) {
         console.log(err);
      }
    };
    getUserInfo();
  }, [login]);

  return (
    <div className="App">
      <Router>
        <Header login={login} setLogin={setLogin} setShow={setShow} />
        <Routes>
          <Route path= '/' element={<Home setLogin={setLogin}/>} />
          {
            login 
              ? <Route path= '/mypage' element={<Mypage setUser={setUser} user={user} />}  /> 
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
