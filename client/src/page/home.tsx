import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import url from '../url';
import './CSS/home.css'

type HomeProps = {
  
}

function Home () {
  let code = new URL(window.location.href).searchParams.get('code');
  let userState = new URL(window.location.href).searchParams.get('state');
  const navigate = useNavigate();

  useEffect(() => {
    switch (localStorage.getItem('social')) {
      case 'naver' :
        console.log(code);
        const sendNaver = async () => {
          try {
            const result = await axios.post(`${url}/social/naver`, { 
              code: code, 
              state: userState
            }, { 
              withCredentials: true 
            });
          } catch (err) {
            console.log(err);
          }
        }
        sendNaver();
        break;
      case 'kakao' :
        const sendKakao = async () => {
          const result2 = await axios.post(`${url}/social/kakaotalk`, { 
            authorizationCode: code,
          }, { 
            withCredentials: true 
          });
        }
        sendKakao();
        break;
      case 'google' :
        const sendGoogle = async () => {
          const result3 = await axios.post(`${url}/social/google`, { 
            authorizationCode: code
          }, { 
            withCredentials: true 
          });
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