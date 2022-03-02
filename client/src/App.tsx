import { createContext, useEffect, useRef, useState } from 'react';
import './App.css';
import { Home, Mypage, CreateGroup, Group, Map} from './page/index';
import { Header, LoginModal, Notify } from './component/index';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import SignUpModal from './component/modal/signupmodal';
import axios from 'axios';
import url from './url';
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
  const latlng = useRef<LatLng>({ y: 0, x: 0 });
  const watch = useRef({ id: 0 });
  const [alarm, setAlarm] = useState<boolean>(true);
  const [list, setList] = useState<Array<any>>([
    {
      id: 1,
      sender: 'kimcoding',
      notifyType: 'invite',
    },
    {
      id: 2,
      sender: 'parkhacker',
      notifyType: 'arrive'
    },
    {
      id: 3,
      sender: 'leehacker',
      notifyType: 'arrive'
    },
    {
      id: 4,
      sender: 'user1',
      notifyType: 'invite'
    }
  ]);

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
        if (watch.current.id !== 0)
          navigator.geolocation.clearWatch(watch.current.id);
        setLogin(false);
      }
    };
    if (login) {
      socket.on("notify", (type, sender, id) => {
        setAlarm(true);
        setList(
          [{
            id: id, 
            sender: sender,
            notifyType: type
          }, 
          ...list]);
      })
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
        socket.emit("sendPosition", {
          user: user,
          position: {
            x: x,
            y: y
          }
        })
      }, () => console.log('denied'), {
        enableHighAccuracy: false,
        timeout: 50000,
        maximumAge: 0
      });
    }
    getUserInfo();
    console.log(watch);
  }, [login]);


  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <Router>
          <Header login={login} setLogin={setLogin} 
          show={show} setShow={setShow} setAlarm={setAlarm} alarm={alarm}
          user={user} setUser={setUser} watch={watch}/>
          <Routes>
            {
              login 
              ? <>
                    <Route path='/mypage' element={<Mypage setUser={setUser} user={user} />}  />     
                    <Route path='/creategroup' element={<CreateGroup user={user}/>} /> 
                    <Route path='/group/:id' element={<Group user={user}/>} />
                    <Route path='/map/:groupId/:userId' element={<Map user={user}/>} />
                    <Route path='/map/:groupId' element={<Map user={user}/>} />
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
            ? <Notify list={list} setList={setList} />
            : <></>
          }
        </Router>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
