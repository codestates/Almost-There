import atlogo from '../data/atlogo.png'
import { useEffect, useRef } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import './CSS/header.css';
import axios from 'axios';
import url from '../url';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ShowList {
  login: boolean,
  signin: boolean
}

type HeaderProps = {
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
  setShow: React.Dispatch<React.SetStateAction<ShowList>>
}


const Header = ({ login, setLogin, setShow }: HeaderProps) => {
  const navigate: NavigateFunction = useNavigate();
  const menuRef = useRef<HTMLInputElement>(null);

  const clickLogo = () => {
    navigate('/');
  }

  const clickMypage = () => {
    navigate('/mypage');
  }

  
  const clickLogout = async () => {
    await axios.post(`${url}/user/logout`, {}, { withCredentials: true});
    setLogin(false);
    navigate('/');
  }
  
  const clickLogin = () => {
    setShow({login: true, signin: false});
  }

  const clickSignin = () => {
    setShow({login: false, signin: true});
  }

  const clickMenu = () => {
    menuRef.current?.setAttribute('hide', 'true');
  }

  return (
    <header>
      <div className='taps'>
        <div className='logo' onClick={clickLogo}>
          <img src={atlogo}/>
        </div>
      </div>
      {login 
        ?
          <div className='taps'>
            <div className='menu' onClick={clickMenu}>menu</div>
            <div className='direction' ref={menuRef}>
              <div className='tap'>알림</div>
              <StyledLink to='creategroup'>
                <div className='tap'>그룹 생성</div>
              </StyledLink>
              <div className='tap' onClick={clickMypage}>마이페이지</div>
            </div>
            <div className='lastap' onClick={clickLogout}>로그아웃</div>
          </div>
        : 
          <div className='taps'>
            <div className='tap'>체험하기</div>
            <div className='tap' onClick={clickLogin}>로그인</div>
            <div className='lastap' onClick={clickSignin}>회원가입</div>
          </div>
      }
    </header>
  )
}

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`

export default Header;