import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { logoN, logoK, logoG } from '../../data';
import url from '../../url';

interface ShowList {
  login: boolean,
  signin: boolean
}

interface Info {
  userId: string,
  password: string
}

interface User {
  userId: string,
  userEm: string,
  userNm: string
}

type LoginModalProps = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
  setShow: React.Dispatch<React.SetStateAction<ShowList>>
  setUser: React.Dispatch<React.SetStateAction<User>>
}

function LoginModal ({ setLogin, setShow, setUser }: LoginModalProps) {
  const naverClientID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const naverState = Math.floor((Math.random() * (99999 - 10000)) + 10000); // RAMDOM_STATE
  const naverRedirectURI = process.env.REACT_APP_NAVER_REDIRECT_URI;

const [info, setInfo] = useState<Info>({
  userId: '',
  password: ''
});
const [msg, setMsg] = useState<boolean>(false);

const clickBack = () => {
  setShow({
    login: false,
    signin: false
  });
}

const handleLogin = async() => {
  try {
    const result: AxiosResponse<any, any> = await axios.post(url, {
      userId: info.userId,
      password: info.password
    }, { withCredentials: true });
    setLogin(true);
    setUser({...result.data.data});
  } catch {
    setMsg(true);
  }
}

const clickSign = () => {
  setShow({
    login: false,
    signin: true
  })
}

/* GOOGLE LOGIN */
const handleGoogleLogin = async () => {
  console.log('naver login');
  // ! 네이버 API로 로그인 인증
  // 네이버 로그인 버튼을 누르면 로그인 인증 요청
  const naverLoginURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientID}&state=${naverState}&redirect_uri=${naverRedirectURI}`;
  window.location.assign(naverLoginURL);
  // window.location.assign(naverLoginURL) -> 바로 이동, window.open(naverLoginURL) -> 팝업
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
  
/* SOCIAL LOGIN */
  console.log(naverClientID);
  console.log(naverState);
  console.log(naverRedirectURI);
  // ! 네이버 API로 로그인 인증
  // 네이버 로그인 버튼을 누르면 로그인 인증 요청
  const naverLoginURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientID}&state=${naverState}&redirect_uri=${naverRedirectURI}`;
  window.location.assign(naverLoginURL);
  // window.open(naverLoginURL);
  // window.location.assign(naverLoginURL) -> 바로 이동, window.open(naverLoginURL) -> 팝업
  // window.open하면 위 콘솔 내용(환경변수 적용되는지) 확인 가능
  
  /*
  ! URL에서 code, state 추출하여 social/naver로 POST 요청, 토큰 발급받기
  * .env에서 REACT_APP_NAVER_REDIRECT_URI=http://localhost:3000/oauth/naver
  * oauth/naver로 라우팅되는 컴포넌트에서 아래 작업 처리
  let code = new URL(window.location.href).searchParams.get('code');
  let userState = new URL(window.location.href).searchParams.get('state');
  // window.location.href -> 현재 주소(URL) 가져오기
  console.log(code, userState)

  // ! 인증한 코드 이용하여 접근 토큰 발급 -> 회원정보 조회 후 jwt 토큰 발급
  const result = await axios.post(`${url}/social/naver`,
    { 
      code: code,
      state: userState
    },
    { 
      withCredentials: true 
    });
  console.log(result);
  */
 };
/* NAVER LOGIN */

 /* KAKAO LOGIN */
const handleKakaoLogin = async () => {
  console.log('naver login');
  // ! 네이버 API로 로그인 인증
  // 네이버 로그인 버튼을 누르면 로그인 인증 요청
  const naverLoginURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientID}&state=${naverState}&redirect_uri=${naverRedirectURI}`;
  window.location.assign(naverLoginURL);
  // window.location.assign(naverLoginURL) -> 바로 이동, window.open(naverLoginURL) -> 팝업
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
          <Img src={logoG} onClick={handleGoogleLogin} />
          <Img src={logoN} onClick={handleNaverLogin} />
          <Img src={logoK} onClick={handleKakaoLogin} />
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
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`

const Img = styled.img`
  background-color: #448aff;
  border-radius: 5px;
  width: 60px;
  height: 60px; 
  padding: 2px;
`


export default LoginModal;