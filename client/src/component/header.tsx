import atlogo from '../data/atlogo.png'
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import url from '../url';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SocketContext } from '../context';
import '@fortawesome/fontawesome-free/js/all'


type HeaderProps = {
  login: boolean,
  setLogin: React.Dispatch<React.SetStateAction<boolean>>,
  show: ShowList,
  setShow: React.Dispatch<React.SetStateAction<ShowList>>,
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
  watch: React.RefObject<any>,
  setAlarm: React.Dispatch<React.SetStateAction<boolean>>,
  alarm: boolean
}


const Header = ({ login, setLogin, show, setShow, user, setUser, watch, setAlarm, alarm }: HeaderProps) => {
  const [display, setDisplay] = useState<boolean>(false);
  const socket = useContext(SocketContext);

  const clickLogout = async () => {
    await axios.post(`${url}/user/logout`, {}, { withCredentials: true});
    navigator.geolocation.clearWatch(watch.current.id);
    socket.emit("logout", user);
    setUser({ userId: '', name: '', email: '' });
    setAlarm(false);
    setLogin(false);
  }
  
  const clickLogin = () => {
    setShow({login: true, signin: false, notify: false});
  }

  const clickSignin = () => {
    setShow({login: false, signin: true, notify: false});
  }

  const clickMenu = () => {
    setDisplay(!display);
  }

  const clickNotify = () => {
    setShow({login: false, signin: false, notify: !show.notify});
    setAlarm(false);
  }

  useEffect(() => {

  }, [login])

  return (
    <Background>
      <Taps>
        <StyledLink to='/'>
          <Logo>
            <Img src={atlogo}/>
            <div>Almost There</div>
          </Logo>
        </StyledLink> 
      </Taps>
      {login 
        ?
          <Taps>
            <Menu login={login} onClick={clickMenu}>
              <div>
                <i className="fa-solid fa-bars"></i>
              </div>
            </Menu>
            <Direction login={login} show={display} 
              onClick={() => setDisplay(false)}>
              <Tap onClick={clickNotify}>
                ??????
              </Tap>
              <StyledLink to='/creategroup'>
                <Tap>?????? ??????</Tap>
              </StyledLink>
              <StyledLink to='/mypage'>
                <Tap>???????????????</Tap>
              </StyledLink>
            </Direction>
            <LastTap onClick={clickLogout}>????????????</LastTap>
            {alarm
              ? <Alarm show={display}></Alarm>
              : <></>
            }
          </Taps>
        : 
          <Taps>
            <Menu login={login} onClick={clickMenu}>
              <div>
                <i className="fa-solid fa-bars"></i>
              </div>
            </Menu>
            <Direction login={login} show={display}
              onClick={() => setDisplay(false)}>
              <StyledLink to='/exp1'>
                <Tap>????????????</Tap>
              </StyledLink>
              <Tap onClick={clickSignin}>????????????</Tap>
            </Direction>
            <LastTap onClick={clickLogin}>?????????</LastTap>
          </Taps>
      }
    </Background>
  )
}
const Background = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: #eceff1;
  justify-content: space-between;
  background-color:#edf0f2;
  align-items: center;
  height: 7vh;
  z-index: 2;
  box-shadow: 0px 1px 2px black;
  @media screen and (max-width: 480px) {
    width: 100vw;
  }
`
const Taps = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`
const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 760px) {
    position: fixed;
    top: 0;
    left: 30%;
    right: 30%;
  }
  @media screen and (max-width: 480px) {
    position: fixed;
    top: 14px;
    left: 30%;
    right: 30%;
  }
`
const Img = styled.img`
  height: 7vh;
  :hover {
    color: white;
  }
  @media screen and (max-width: 480px) {
    display: none;
  }
`
interface MenuI {
  login: boolean
}
const Menu = styled.div<MenuI>`
  width: 100px;
  height: 7vh;
  display: none;
  @media screen and (max-width: 760px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px 20px 10px 20px;
  }
`
interface DirectionI {
  show: boolean,
  login: boolean
}
const Direction = styled.div<DirectionI>`
  display: flex;
  width: ${(props) => props.login ? '400px' : '260px'};
  @media screen and (max-width: 760px) {
    width: 100px;
    position: fixed;
    flex-direction: column;
    top: 7vh;
    left: 0;
    display: ${(props) => props.show ? 'flex' : 'none'};
    background-color: #eceff1;
    border-top: solid black 1px;
    box-shadow: 1px 1px 3px black;
  }
`
const Tap = styled.div`
  width: 130px;
  position: relative;
  padding: 10px 0px;
  font-weight: bold;
  border-radius: 20px;
  :hover {
    background-color: #1a1a1a;
    color: white;
    cursor: pointer;
  }
  @media screen and (max-width: 760px) {
    width: 100px;
    height: 7vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
    border-bottom: solid black 1px;
    border-radius: 0px;
  }
`
const LastTap = styled.div`
  width: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  margin-right: 20px;
  font-weight: bold;
  border-radius: 20px;
  align-items: center;
  :hover {
    background-color: #1a1a1a;
    color: white;
    cursor: pointer;
  }
  @media screen and (max-width: 760px) {
    width : 100px;
    margin-right: 0px;
  }
`
interface AlarmI {
  show: boolean
}
const Alarm = styled.div<AlarmI>`
  position: fixed;
  top: 10px;
  right: 450px; 
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: red;
  z-index:2;
  @media screen and (max-width: 760px) {
    top: ${(props) => props.show ? '60px': '10px'};
    left: ${(props) => props.show ? '80px' : '70px'};
  }
`
const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  @media screen and (max-width: 760px) {
    color: black;
  }
`

export default Header;