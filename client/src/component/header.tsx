import atlogo from '../data/atlogo.png'
import { useRef } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import './CSS/header.css';

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

  
  const clickLogout = () => {
    setLogin(false);
    navigate('/');
  }
  
  const clickLogin = () => {
    setShow({
      login: true,
      signin: false
    })
  }

  const clickSignin = () => {
    setShow({
      login: false,
      signin: true
    })
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
              <div className='tap'>그룹 생성</div>
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

export default Header;