import { createContext, useEffect, useRef, useState } from 'react';
import './App.css';
import { Home, Mypage, CreateGroup, Group, Map, Complete} from './page/index';
import { Header, LoginModal, Notify } from './component/index';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import SignUpModal from './component/modal/signupmodal';
import axios from 'axios';
import url from './url';
/* IO */ import { socket, SocketContext } from './context';
// import Globalstyle from './Styles/Globalstyle';
// import GlobalFont from './Styles/GlobalFonts';



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
  const [alarm, setAlarm] = useState<boolean>(false);
  const [list, setList] = useState<Array<any>>([]);
  const typeArr = ['', 'invite', 'arrive', 'leave'];

  /* IO */
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get(`${url}/user/info`, { withCredentials: true });
        const { userId, name, email } = res.data.user;
        setUser({ userId, name, email });
        socket.emit("login", { userId, name, email });
        setLogin(true);
      } catch (err) {
        if (watch.current.id !== 0)
          navigator.geolocation.clearWatch(watch.current.id);
        setLogin(false);
      }
    };
    getUserInfo();
    console.log(user);
    if (login) {
      const getList = async () => {
        const res = await axios.get(`${url}/notification/list`, { withCredentials: true });
        console.log(res.data.notice.length);
        if (res.data.notice.length > 0) {
          setAlarm(true);
        } 
      }
      getList();
      socket.on("notify", (type, sender, notifyId ,groupId, groupName) => {
        const notifyType = typeArr.indexOf(type);
        console.log(type, sender, notifyId ,groupId, groupName);
        setAlarm(true);
        setList(
          [{
            id: notifyId, 
            sender: sender,
            notifyType: notifyType,
            groupId: groupId,
            groupName: groupName
          }, 
          ...list]);
        if (type === "invite") {
          socket.emit("joinGroup", groupId);
        }
      })
    }
  }, [login]);

  useEffect(() => {
    console.log(user);
    if (user.userId) {
      watch.current.id = 
      navigator.geolocation.watchPosition(async(coor) => {
        const x = Math.round(coor.coords.longitude*10000)/10000;
        const y = Math.round(coor.coords.latitude*10000)/10000;
        // const x = coor.coords.longitude;
        // const y = coor.coords.latitude;
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
  }, [user])


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
                    <Route path='/complete' element={<Complete />} />
                </>
              : <>
                  <Route path='/complete' element={<Complete />} />
                  <Route path='/*' element={<Navigate to='/' />} />
                </>
            }
            <Route path= '/' element={<Home setLogin={setLogin} setUser={setUser} login={login} /> } />
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
            ? <Notify list={list} setList={setList} show={show} setShow={setShow}/>
            : <></>
          }
        </Router>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
