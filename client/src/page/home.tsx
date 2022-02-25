import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import url from '../url';

interface User {
  userId: string,
  email: string,
  name: string
}

type HomeProps = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
  setUser: React.Dispatch<React.SetStateAction<User>>
}

function Home ({setLogin, setUser}: HomeProps) {
  let code = new URL(window.location.href).searchParams.get('code');
  let userState = new URL(window.location.href).searchParams.get('state');
  const navigate = useNavigate();

  useEffect(() => {
    switch (localStorage.getItem('social')) {
      case 'naver' :
        console.log(code);
        const sendNaver = async () => {
          const res = await axios.post(`${url}/social/naver`, { 
            code: code, state: userState
          }, { withCredentials: true });
          const {userId, name, email} = res.data.data;
          setUser({
            userId,
            name,
            email
          })
          setLogin(true);
        }
        sendNaver();
        break;
      case 'kakao' :
        const sendKakao = async () => {
          const res = await axios.post(`${url}/social/kakaotalk`, { 
            authorizationCode: code,
          }, { withCredentials: true });
          const {userId, name, email} = res.data.data;
          setUser({
            userId,
            name,
            email
          })
          setLogin(true);
        }
        sendKakao();
        break;
      case 'google' :
        const sendGoogle = async () => {
          const res = await axios.post(`${url}/social/google`, { 
            authorizationCode: code
          }, { withCredentials: true });
          const {userId, name, email} = res.data.data;
          setUser({
            userId,
            name,
            email
          })
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