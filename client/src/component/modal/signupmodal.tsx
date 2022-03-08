import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { convertTypeAcquisitionFromJson } from 'typescript';
import { MsgModal } from '..';
import url from '../../url';

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

function SignUpModal ({setShow}: SigninModalProps) {
  const [info, setInfo] = useState<Info>({
    userId: '',
    password: '',
    checkpw: '',
    name: '',
    email: ''
  });
  const [check, setCheck] = useState<Check>({
    userId: false,
    password: true,
    checkpw: true,
    name: true,
    email: true
  });
  const [msg, setMsg] = useState<Info>({
    userId: '',
    password: '',
    checkpw: '',
    name: '',
    email: ''
  });
  const [view, setView] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const clickBack = () => {
    setShow({login: false, signin: false, notify: false});
  }

  const validId = async () => {
    const regExp = /^[a-z]{1,1}[a-z0-9]{3,19}$/i;
    if (regExp.test(info.userId)) {
      try {
        const res = await axios.post(`${url}/user/check-id`, {
          userId: info.userId
        },{withCredentials: true});
        if (res) {
          setCheck({...check, userId: true});
          setMsg({...msg, userId: '사용 가능한 아이디입니다.'});
        }
      } catch {
        setCheck({...check, userId: false});
        setMsg({...msg, userId: '이미 사용중인 아이디입니다.'});
      }
    } else {
      setCheck({...check, userId: false});
      setMsg({...msg, userId: `아이디는 4~20 영문, 숫자로 구성되어야합니다.`});
    }
  };

  const validPw = () => {
    const regExp = /^.{4,20}$/;
    if (regExp.test(info.password)) {
      setCheck({...check, password: true});
      setMsg({...msg, password: '사용할 수 있는 비밀번호입니다.'});
    } else {
      setCheck({...check, password: false});
      setMsg({...msg, password: '비밀번호는 4~20자여야 합니다.'});
    }
  };

  const checkPassword = () => {
    if (info.checkpw === info.password) {
      setCheck({...check, checkpw: true});
      setMsg({...msg, checkpw: '비밀번호 확인완료'});
    } else {
      setCheck({...check, checkpw: false});
      setMsg({...msg, checkpw: '비밀번호가 일치하지 않습니다.'});
    }
  }

  const checkName = () => {
    if (info.name) setCheck({...check, name: true});
    else {
      setCheck({...check, name: false});
      setMsg({...msg, name: '필수 정보입니다.'})
    }
  }

  const validEmail = () => {
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (regExp.test(info.email)) {
      setCheck({...check, email: true});
      setMsg({...msg, email: ''});
    } else {
      setCheck({...check, email: false});
      setMsg({...msg, email: '올바른 이메일 형식이 아닙니다.'});
    }
  };

  const sendSignup = async () => {
    const {userId, password, checkpw, name, email} = info;
    try {
      if (check.userId && check.password && check.checkpw && check.name && check.email) {
        const res = await axios.post(`${url}/user/signup`, {
          userId, password, name, email
        });
        if (res.status === 201) {
          setShow({login: false, signin: false, notify: false});
        }
      } else {
        setText('모든 정보를 입력해야 합니다.');
        setView(true);
      }
    } catch (err) {
      console.log(err);
    }
   
  }

  const moveToLogin = () => {
    setShow({login: true, signin: false, notify: false});
  }

  return (
    <Backdrop onClick={clickBack}>
      <View onClick={(e) => e.stopPropagation()}>
        <Title>Almost There</Title>
        <div>
          <Input placeholder='아이디'
          value={info.userId}
          onChange={e => setInfo({...info, userId: e.target.value})}
          onBlur={validId}
          ></Input>
          <Desc valid={check.userId}>{msg.userId}</Desc>
        </div>
        <div>
          <Input placeholder='비밀번호'
          value={info.password}
          onChange={e => setInfo({...info, password: e.target.value})}
          onBlur={validPw}
          type={'password'}
          ></Input>
          <Desc valid={check.password}>{msg.password}</Desc>
        </div>
        <div>
          <Input placeholder='비밀번호 확인'
          value={info.checkpw}
          onChange={e => setInfo({...info, checkpw: e.target.value})}
          onBlur={checkPassword}
          type={'password'}
          ></Input>
          <Desc valid={check.checkpw}>{msg.checkpw}</Desc>
        </div>
        <div>
          <Input placeholder='이름'
          value={info.name}
          onChange={e => setInfo({...info, name: e.target.value})}
          onBlur={checkName}
          ></Input>
          <Desc valid={check.name}>{msg.name}</Desc>
        </div>
        <div>
          <Input placeholder='이메일'
          value={info.email}
          onChange={e => setInfo({...info, email: e.target.value})}
          onBlur={validEmail}
          ></Input>
          <Desc valid={check.email}>{msg.email}</Desc>
        </div>
        <div></div>
        <Button onClick={sendSignup}>회원가입</Button>
        <ToLogin>
          <div>이미 회원이신가요?</div>
          <Anchor onClick={moveToLogin}>로그인하기</Anchor>
        </ToLogin>
        {
          view 
            ? <MsgModal msg={text} setView={setView} />
            : <></>
        }
      </View>
    </Backdrop>
  )
}


const Backdrop = styled.div`
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
const View = styled.div`
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

interface DescI {
  valid: boolean;
}

const Desc = styled.div<DescI>`
  height: 20px;
  padding: 5px 0 0 0;
  font-size: 12px;
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

export default SignUpModal;