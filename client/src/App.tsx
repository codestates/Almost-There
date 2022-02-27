import { useEffect, useState } from 'react';
import './App.css';
import { Home, Mypage, CreateGroup, Group, Map} from './page/index';
import { Header, LoginModal, Notify } from './component/index';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import SignUpModal from './component/modal/signupmodal';
import axios from 'axios';
import url from './url';
/* IO */ import { io, Socket } from 'socket.io-client';
/* IO */ import { socket, SocketContext } from './context';




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
/* IO */
interface ServerToClientEvents {
connection: () => void;
login: (a: string) => void;
logout: (b: string) => void;
thisUser: (c: string) => void;
error: (error: string) => void;
}

interface ClientToServerEvents {
login: (user: object) => void;
logout: (user: object) => void;
thisUser: (user: object) => void;

}

// const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(url, {
//     withCredentials: true
//   });
/* IO */



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

  /* IO */

  socket.on('error', (error) => {
    console.log(error);
  });
  /* IO */
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
    /* IO */
    if (login) {
      console.log(user.userId);
      console.log(user)
      socket.emit('login', user);
      socket.on('login', (payload) => {
        console.log(payload);
      });
    } 
    if (!login) {
      socket.emit('logout', user);
      socket.on('logout', (payload) => {
        console.log(payload);
      });
    }
    /* IO */
  }, [login]);


  return (
    <div className="App">
      {/* IO */}<SocketContext.Provider value={socket}>
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
      {/* IO */}</SocketContext.Provider>
    </div>
  );
}

export default App;
