import styled from 'styled-components';
import { logoN, logoK, logoG } from '../../data';

interface ShowList {
  login: boolean,
  signin: boolean
}

type LoginModalProps = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
  setShow: React.Dispatch<React.SetStateAction<ShowList>>
}

function LoginModal ({ setLogin, setShow }: LoginModalProps) {

  return (
    <Background>
      <Container>
        <Title>Almost There</Title>
        <Inputs>
          <div>
            <Input placeholder='아이디'></Input>
          </div>
          <div>
            <Input placeholder='비밀번호'></Input>
          </div>
        </Inputs>
        <div></div>
        <div>
          <Button>로그인</Button>
        </div>
        <Links>
          <div>아직 회원이 아니신가요?</div>
          <a>회원가입하기</a>
        </Links>
        <Logos>
          <Img src={logoG}/>
          <Img src={logoN}/>
          <Img src={logoK}/>
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
`
const Container = styled.div`
  position: fixed;
  z-index: 11;
  top:10%;
  left:30%;
  width:40%;
  height:80%;
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
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
`

const Button = styled.button`
  width: 200px;
  height: 50px;
  background-color:#448aff;
  font-weight: bold;
`

const Links = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
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
  width: 50px;
  height: 50px; 
  padding: 2px;
`


export default LoginModal;