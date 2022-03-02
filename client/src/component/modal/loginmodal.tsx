import axios, { AxiosResponse } from 'axios';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { SocketContext } from '../../context';
import { logoN, logoK, logoG } from '../../data';
import url from '../../url';

interface Info {
  userId: string,
  password: string
}

interface User {
  userId: string,
  name: string,
  email: string
}

type LoginModalProps = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
  setShow: React.Dispatch<React.SetStateAction<ShowList>>
  setUser: React.Dispatch<React.SetStateAction<User>>
}

function LoginModal ({ setLogin, setShow, setUser }: LoginModalProps) {
const socket = useContext(SocketContext);

const [info, setInfo] = useState<Info>({
  userId: '',
  password: ''
});
const [msg, setMsg] = useState<boolean>(false);

const clickBack = () => {
  setShow({
    login: false,
    signin: false,
    notify: false
  });
}

const handleLogin = async() => {
  try {
    const result: AxiosResponse<any, any> = await axios.post(`${url}/user/login`, {
      userId: info.userId,
      password: info.password
    }, { withCredentials: true });
    const {userId, name, email} = result.data.data;
    setUser({
      userId,
      name,
      email
    });
    socket.emit("login", { userId, name, email });
    setLogin(true);
    setShow({ login: false, signin: false, notify: false});
  } catch {
    setMsg(true);
  }
}

const clickSign = () => {
  setShow({
    login: false,
    signin: true,
    notify: false
  })
}

 /* NAVER LOGIN */
const handleNaverLogin = async () => {
  const naverLoginURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
    process.env.REACT_APP_NAVER_CLIENT_ID
  }&state=${
    Math.floor((Math.random() * (99999 - 10000)) + 10000)
  }&redirect_uri=${
    process.env.REACT_APP_REDIRECT_URI
  }`;
  localStorage.setItem('social', 'naver');
  window.location.assign(naverLoginURL);
 };

 /* KAKAO LOGIN */
const handleKakaoLogin = async () => {
  const kakaoLoginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  localStorage.setItem('social', 'kakao');
  window.location.assign(kakaoLoginURL);
 };

 /* GOOGLE LOGIN */
const handleGoogleLogin = async () => {
  const googleLoginURL = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
  localStorage.setItem('social', 'google');
  window.location.assign(googleLoginURL);
 };

  return (
    <Background onClick={clickBack}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Title>Almost There</Title>
        <Inputs>
          <div>
            <Input placeholder='아이디' value={info.userId} 
            onChange={(e) => setInfo({...info, userId: e.target.value})}></Input>
          </div>
          <div>
            <Input placeholder='비밀번호' value={info.password}
            onChange={(e) => setInfo({...info, password: e.target.value})}></Input>
          </div>
          { 
            msg 
              ? <Message>아이디 또는 비밀번호가 올바르지 않습니다.</Message>
              : <Message></Message>
          }
        </Inputs>
        <Inputs>
          <Button onClick={handleLogin}>로그인</Button>
        </Inputs>
        <Links>
          <div>아직 회원이 아니신가요?</div>
          <Anchor onClick={clickSign}>회원가입하기</Anchor>
        </Links>
        <Logos>
          <ImgFrame>
            <Img src={logoN} onClick={handleNaverLogin} />
          </ImgFrame>
          <ImgFrame>
            <Img src={logoK} onClick={handleKakaoLogin} />
          </ImgFrame>
          <ImgFrame>
            <GImg src={logoG} onClick={handleGoogleLogin} />
          </ImgFrame>
        </Logos>
      </Container>
    </Background>
  )
}


const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
  display:flex;
  justify-content:center;
  align-items:center;
`
const Container = styled.div`
  position: fixed;
  z-index: 11;
  width: 400px;
  height: 600px;
  background-color: #eeeeee;
  display: flex;
  place-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  @media screen and (max-width: 760px) {
    width: 300px;
  }
`

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`

const Inputs = styled.div`
  width: 80%;
`

const Input = styled.input`
  width: 100%;
  height: 50px;
  margin: 5px 0px;
`

const Message = styled.div`
  width: 80%;
  height: 20px;
  display:flex;
  justify-content: left;
  font-size: 15px;
  color: red;
`

const Button = styled.button`
  width: 100%;
  height: 50px;
  background-color:#448aff;
  font-weight: bold;
  cursor: pointer;
`

const Links = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  @media screen and (max-width: 760px) {
    flex-direction: column;
  }
`

const Anchor = styled.a`
  padding: 0px 10px;
  color: #448aff;
  cursor: pointer;
`

const Logos = styled.div`
  background-color: #eeeeee;
  width: 180px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const ImgFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 180px;
  height: 40px;
  margin: 5px;
  border-bottom: solid rgba(0, 0, 0, 0.4) 1px;
  border-radius: 5px;
`
// const GImgFrame = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   overflow: hidden;
//   width: 200px;
//   height: 40px;
//   margin-top: 5px;
//   border-bottom: solid rgba(0, 0, 0, 0.4) 1px;
//   border-radius: 5px;
// `

const Img = styled.img`
  padding: 2px;
  width: 200px;
  height: 50px;
  cursor: pointer;
`
const GImg = styled.img`
  width: 200px;
  height: 45px;
`

export default LoginModal;