import { useState } from 'react';
import styled from 'styled-components';

interface ShowList {
  login: boolean,
  signin: boolean
}

interface Info {
  userId: string,
  password: string,
  checkpw: string,
  name: string,
  email: string,
}

interface Check {
  userId: boolean,
  password: boolean,
  checkpw: boolean,
  name: boolean,
  email: boolean
}

type SigninModalProps = {
  setShow: React.Dispatch<React.SetStateAction<ShowList>>
}

function SignInModal ({setShow}: SigninModalProps) {
  const [info, setInfo] = useState<Info>({
    userId: '',
    password: '',
    checkpw: '',
    name: '',
    email: ''
  })

  const [check, setCheck] = useState<Check>({
    userId: true,
    password: true,
    checkpw: true,
    name: true,
    email: true
  })

  const clickBack = () => {
    setShow({
      login: false,
      signin: false
    });
  }

  return (
    <Background onClick={clickBack}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Title>Almost There</Title>
        <div>
          <Input placeholder='아이디'
          value={info.userId}
          onChange={e => setInfo({...info, userId: e.target.value})}
          ></Input>
          <Desc valid={check.userId}>abc</Desc>
        </div>
        <div>
          <Input placeholder='비밀번호'
          value={info.password}
          onChange={e => setInfo({...info, password: e.target.value})}
          ></Input>
          <Desc valid={check.password}></Desc>
        </div>
        <div>
          <Input placeholder='비밀번호 확인'
          value={info.checkpw}
          onChange={e => setInfo({...info, checkpw: e.target.value})}
          ></Input>
          <Desc valid={check.checkpw}></Desc>
        </div>
        <div>
          <Input placeholder='이름'
          value={info.name}
          onChange={e => setInfo({...info, name: e.target.value})}
          ></Input>
          <Desc valid={check.name}></Desc>
        </div>
        <div>
          <Input placeholder='이메일'
          value={info.email}
          onChange={e => setInfo({...info, email: e.target.value})}
          ></Input>
          <Desc valid={check.email}></Desc>
        </div>
        <div></div>
        <Button>회원가입</Button>
        <ToLogin>
          <div>이미 회원이신가요?</div>
          <Anchor>로그인하기</Anchor>
        </ToLogin>

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
  margin: 20px 0px;
`

const Input = styled.input`
  width: 250px;
  height: 50px;
`

interface Desc {
  valid: boolean;
}

const Desc = styled.div<Desc>`
  height: 20px;
  padding: 5px 0 0 0;
  font-size: 14px;
  text-align: left;
  color: ${(props) => (props.valid ? 'green' : 'red')};
`

const Button = styled.button`
  width: 200px;
  height: 50px;
  background-color: #448aff;
  cursor: pointer;
`

const ToLogin = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 760px) {
    flex-direction: column;
    justify-content: center;
  }
`

const Anchor = styled.a`
  color: #448aff;
  cursor: pointer;
`

export default SignInModal;