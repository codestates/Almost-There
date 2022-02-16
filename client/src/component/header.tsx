
import { NavigateFunction, useNavigate } from 'react-router-dom';
import './CSS/header.css';
/* GOOGLE LOGIN */ import googleLogin from './googleLogin.png';
/* KAKAO LOGIN */ import kakaoLogin from './kakaoLogin.png';
/* NAVER LOGIN */ import naverLogin from './naverLogin.png';
const axios = require('axios');
const clientID = process.env.REACT_APP_NAVER_CLIENT_ID;
const state = Math.floor((Math.random() * (99999 - 10000)) + 10000); // RAMDOM_STATE
const redirectURI = encodeURI('http://localhost:3000');
/* NAVER LOGIN */
import atlogo from '../data/atlogo.png'
import { useRef } from 'react';

interface ShowList {
  login: boolean,
  signin: boolean
}

type HeaderProps = {
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
  setShow: React.Dispatch<React.SetStateAction<ShowList>>
}

/* GOOGLE LOGIN */
const handleGoogleLogin = async () => {
  console.log('naver login');
  // ! 네이버 API로 로그인 인증
  // 네이버 로그인 버튼을 누르면 로그인 인증 요청
  const loginURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientID}&state=${state}&redirect_uri=${redirectURI}`;
  window.location.assign(loginURL);
  // window.location.assign(loginURL) -> 바로 이동, window.open(loginURL) -> 팝업
  const newURL = new URL(window.location.href);
  // window.location.href -> 현재 주소(URL) 가져오기
  let code = newURL.searchParams.get('code');
  let userState = newURL.searchParams.get('state');

  // ! 인증한 코드 이용하여 접근 토큰 발급 -> 회원정보 조회 후 jwt 토큰 발급
  const result = await axios.post('http://localhost:4000/social/naver',
    { 
      code: code,
      state: userState
    },
    { 
      withCredentials: true 
    });
  console.log(result);
 };

 /* KAKAO LOGIN */
const handleKakaoLogin = async () => {
  console.log('naver login');
  // ! 네이버 API로 로그인 인증
  // 네이버 로그인 버튼을 누르면 로그인 인증 요청
  const loginURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientID}&state=${state}&redirect_uri=${redirectURI}`;
  window.location.assign(loginURL);
  // window.location.assign(loginURL) -> 바로 이동, window.open(loginURL) -> 팝업
  const newURL = new URL(window.location.href);
  // window.location.href -> 현재 주소(URL) 가져오기
  let code = newURL.searchParams.get('code');
  let userState = newURL.searchParams.get('state');

  // ! 인증한 코드 이용하여 접근 토큰 발급 -> 회원정보 조회 후 jwt 토큰 발급
  const result = await axios.post('http://localhost:4000/social/naver',
    { 
      code: code,
      state: userState
    },
    { 
      withCredentials: true 
    });
  console.log(result);
 };

/* NAVER LOGIN */
const handleNaverLogin = async () => {
  console.log('naver login');
  // ! 네이버 API로 로그인 인증
  // 네이버 로그인 버튼을 누르면 로그인 인증 요청
  const loginURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientID}&state=${state}&redirect_uri=${redirectURI}`;
  window.location.assign(loginURL);
  // window.location.assign(loginURL) -> 바로 이동, window.open(loginURL) -> 팝업
  const newURL = new URL(window.location.href);
  // window.location.href -> 현재 주소(URL) 가져오기
  let code = newURL.searchParams.get('code');
  let userState = newURL.searchParams.get('state');

  // ! 인증한 코드 이용하여 접근 토큰 발급 -> 회원정보 조회 후 jwt 토큰 발급
  const result = await axios.post('http://localhost:4000/social/naver',
    { 
      code: code,
      state: userState
    },
    { 
      withCredentials: true 
    });
  console.log(result);
 };
/* NAVER LOGIN */

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
              {/* GOOGLE LOGIN */}<img onClick={handleGoogleLogin}
              alt='GOOGLE LOGIN' src={googleLogin} width='200px' />
              {/* KAKAO LOGIN */}<img onClick={handleKakaoLogin}
              alt='KAKAO LOGIN' src={kakaoLogin} width='80px' />
              {/* NAVER LOGIN */}<img onClick={handleNaverLogin}
              alt='NAVER LOGIN' src={naverLogin} width='50px' />
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