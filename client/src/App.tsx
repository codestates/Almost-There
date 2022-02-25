import { useEffect, useState } from 'react';
import './App.css';
import { Home, Mypage, CreateGroup, Group, Map, Timer} from './page/index';
import { Header, LoginModal, Notify } from './component/index';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import SignUpModal from './component/modal/signupmodal';
import axios from 'axios';
import url from './url';



declare global {
  interface User {
    userId: string,
    email: string,
    name: string
  }
  interface ShowList {
    login: boolean,
    signin: boolean,
    notify: boolean
  }
}


function App() {
  const [login, setLogin] = useState<boolean>(true);
  const [show, setShow] = useState<ShowList>({
    login: false,
    signin: false,
    notify: false
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
        setLogin(true);
      } catch (err) {
        setLogin(false);
      }
    };
    getUserInfo();
  }, [login]);


  return (
    <div className="App">
      <Router>
        <Header login={login} setLogin={setLogin} show={show} setShow={setShow} />
        <Routes>
          {
            login 
            ? <>
                <Route path= '/mypage' element={<Mypage setUser={setUser} user={user} />}  />
                <Route path='/map' element={<Map />} />        
                <Route path='/creategroup' element={<CreateGroup user={user}/>} /> 
                <Route path='/group/:id' element={<Group />} />
              </>
            : <>
                <Route path='/timer' element={<Timer />} />        
                <Route path='/map' element={<Map />} />        
                <Route path='/*' element={<Navigate to='/' />} />
              </>
          }
          <Route path= '/' element={<Home setLogin={setLogin} setUser={setUser}/> } />
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
        {
          show.notify
            ? <Notify />
            : <></>
        }
      </Router>

    </div>
  );
}

export default App;
