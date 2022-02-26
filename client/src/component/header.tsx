import atlogo from '../data/atlogo.png'
import { useState } from 'react';
import axios from 'axios';
import url from '../url';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


type HeaderProps = {
  login: boolean,
  setLogin: React.Dispatch<React.SetStateAction<boolean>>,
  show: ShowList,
  setShow: React.Dispatch<React.SetStateAction<ShowList>>
}


const Header = ({ login, setLogin, show, setShow }: HeaderProps) => {
  const [display, setDisplay] = useState<boolean>(false);
  
  const clickLogout = async () => {
    await axios.post(`${url}/user/logout`, {}, { withCredentials: true});
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
  }

  return (
    <Background>
      <Taps>
        <StyledLink to='/'>
          <Logo>
            <Img src={atlogo}/>
            Almost There
          </Logo>
        </StyledLink> 
      </Taps>
      {login 
        ?
          <Taps>
            <Menu login={login} onClick={clickMenu}>menu</Menu>
            <Direction login={login} show={display} 
              onClick={() => setDisplay(false)}>
              <Tap onClick={clickNotify}>알림</Tap>
              <StyledLink to='/creategroup'>
                <Tap>그룹 생성</Tap>
              </StyledLink>
              <StyledLink to='/mypage'>
                <Tap>마이페이지</Tap>
              </StyledLink>
            </Direction>
            <LastTap onClick={clickLogout}>로그아웃</LastTap>
          </Taps>
        : 
          <Taps>
            <Menu login={login} onClick={clickMenu}>menu</Menu>
            <Direction login={login} show={display}
              onClick={() => setDisplay(false)}>
              <StyledLink to='/'>
                <Tap>체험하기</Tap>
              </StyledLink>
              <Tap onClick={clickLogin}>로그인</Tap>
              <Tap onClick={clickSignin}>회원가입</Tap>
            </Direction>
          </Taps>
      }
    </Background>
  )
}
const Background = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-between;
  align-items: center;
  background-color: wheat;
  height: 7vh;
  @media screen and (max-width: 760px) {
    background-color: wheat;
    color: black;
  }
`
const Taps = styled.div`
  display: flex;
  font-size: 20px;
`
const Logo = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 760px) {
    position: fixed;
    top: 0;
    left: 30%;
    right: 30%;
  }
`
const Img = styled.img`
  height: 50px;
  :hover {
    color: white;
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
    position: fixed;
    top: 0;
    left: ${(props) => props.login ? 0 : 'none'}px;
    right: ${(props) => props.login ? 'none' : 0}px;
    padding: 10px 20px 10px 20px;
  }
`
interface DirectionI {
  show: boolean,
  login: boolean
}
const Direction = styled.div<DirectionI>`
  display: flex;
  width: 320px;
  @media screen and (max-width: 760px) {
    width: 100px;
    position: fixed;
    flex-direction: column;
    top: 7vh;
    left: ${(props) => props.login ? 0 : 'none'};
    right: ${(props) => props.login ? 'none' : 0};
    display: ${(props) => props.show ? 'flex' : 'none'};
    background-color: black;
  }
`
const Tap = styled.div`
  padding: 10px 20px 10px 20px;
  :hover {
    background-color: #004d40;
    color: white;
    cursor: pointer;
  }
  @media screen and (max-width: 760px) {
    width: 100px;
    height: 40px;
    padding: 10px 0px;
    color: white;
  }
`
const LastTap = styled.div`
  padding: 10px 40px 10px 20px;
  :hover {
    background-color: #004d40;
    color: white;
    cursor: pointer;
  }
  @media screen and (max-width: 760px) {
    position: fixed;
    top: 0;
    right: 0;
    padding: 13px 20px 10px 20px;
  }
`
const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  @media screen and (max-width: 760px) {
    color: white;
  }
`

export default Header;