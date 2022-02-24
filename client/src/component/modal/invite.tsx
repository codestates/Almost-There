import { useState } from 'react';
import styled from 'styled-components';

interface Show {
  calendar: boolean,
  location: boolean,
  invite: boolean
}

type InviteProps = {
  setModal: React.Dispatch<React.SetStateAction<Show>>,
  inviteList: Array<string>,
  setInviteList: React.Dispatch<React.SetStateAction<Array<string>>>
}

const Invite = ({ setModal, inviteList, setInviteList }: InviteProps) => {
  const [name, setName] = useState<string>('');
  const clickBack = () => {
    setModal({
      calendar: false,
      invite: false,
      location: false
    });
  }
  const handleComplete = () => {
    if (name) {
      setInviteList([...inviteList, name])
    }
    setModal({
      calendar: false,
      invite: false,
      location: false
    });
  }
  return (
    <Background onClick={clickBack}>
      <View onClick={e => e.stopPropagation()}>
        <Title>Almost There</Title>
        <div>
          <Input value={name} onChange={e => setName(e.target.value)}></Input>
          <Desc>초대하고 싶은 친구의 아이디를 입력하세요</Desc>
        </div>
        <Button onClick={handleComplete}>초대 하기</Button>
      </View>
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
const View = styled.div`
  position: fixed;
  z-index: 11;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #eeeeee;
`
const Title = styled.div`
  font-size:25px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
`
const Input = styled.input`
  width: 300px;
  height: 50px;
`
const Desc = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-top: 10px;
`
const Button = styled.button`
  width: 200px;
  height: 50px;
  font-weight : bold;
  :hover {
    cursor: pointer;
  }
`

export default Invite;