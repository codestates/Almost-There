import { createContext, useEffect, useRef, useState } from 'react';
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
interface LatLng {
  x: number,
  y: number
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
  });
  const latlng = useRef<LatLng>({ x: 0, y: 0 });
  const watch = useRef({ id: 0 });

  socket.on('error', (error) => {
    console.log(error);
  });
  /* IO */
  useEffect(() => {
    console.log(user);
    const getUserInfo = async () => {
      try {
        const res = await axios.get(`${url}/user/info`, { withCredentials: true });
        const { userId, name, email } = res.data.user;
        setUser({ userId, name, email });
        setLogin(true);
      } catch (err) {
        navigator.geolocation.clearWatch(watch.current.id);
        setLogin(false);
      }
    };
    if (login) {
      watch.current.id = 
      navigator.geolocation.watchPosition(async(coor) => {
        const x = Math.round(coor.coords.longitude*10000)/10000;
        const y = Math.round(coor.coords.latitude*10000)/10000;
        if (x !== latlng.current.x || y !== latlng.current.y) {
          console.log('send position to server');
          await axios.post(`${url}/user/latlng`,{
            y: y,
            x: x
          }, {withCredentials: true});
          latlng.current.x = x;
          latlng.current.y = y;
        }
      }, () => console.log('denied'), {
        enableHighAccuracy: false,
        timeout: 50000,
        maximumAge: 0
      });
    }
    getUserInfo();
    /* IO */
    if (login) {
      console.log(user.userId);
      console.log(user)
      socket.emit('login', user);
      socket.on('login', (payload) => {
        console.log(payload);
      });
      socket.on('notify', (payload) => {
        console.log(payload) //콘솔 ? 위치 ? App.tsx
        const regex = /[^0-9]/g;
        const groupId = payload.replace(regex, "")
        const thisUser = 'group' + " " + groupId
        socket.emit('thisUser', thisUser) // 아직 어떤 식인지는 모름 ex) group 1번 모임에서 초대가 왔습니다.
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
      <SocketContext.Provider value={socket}>
        <Router>
          <Header login={login} setLogin={setLogin} 
          show={show} setShow={setShow} 
          user={user} setUser={setUser} watch={watch}/>
          <Routes>
            {
              login 
              ? <>
                    <Route path='/mypage' element={<Mypage setUser={setUser} user={user} />}  />     
                    <Route path='/creategroup' element={<CreateGroup user={user}/>} /> 
                    <Route path='/group/:id' element={<Group />} />
                    <Route path='/map/:groupId/:userId' element={<Map />} />
                    <Route path='/map/:groupId' element={<Map />} />
                </>
              : <>
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
      </SocketContext.Provider>
    </div>
  );
}

export default App;
