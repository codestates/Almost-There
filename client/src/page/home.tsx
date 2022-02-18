import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import url from '../url';
import './CSS/home.css'

type HomeProps = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

function Home ({setLogin}: HomeProps) {
  let code = new URL(window.location.href).searchParams.get('code');
  let userState = new URL(window.location.href).searchParams.get('state');
  const navigate = useNavigate();

  useEffect(() => {
    switch (localStorage.getItem('social')) {
      case 'naver' :
        console.log(code);
        const sendNaver = async () => {
          await axios.post(`${url}/social/naver`, { 
            code: code, state: userState
          }, { withCredentials: true });
          setLogin(true);
        }
        sendNaver();
        break;
      case 'kakao' :
        const sendKakao = async () => {
          await axios.post(`${url}/social/kakaotalk`, { 
            authorizationCode: code,
          }, { withCredentials: true });
          setLogin(true);
        }
        sendKakao();
        break;
      case 'google' :
        const sendGoogle = async () => {
          await axios.post(`${url}/social/google`, { 
            authorizationCode: code
          }, { withCredentials: true });
          setLogin(true);
        }
        sendGoogle();
        break;
      default:
        break;
    }
    localStorage.removeItem('social');
    navigate('/');
  }, []);

  return (
    <>
      <div>home</div>
    </>
  )
}

export default Home;