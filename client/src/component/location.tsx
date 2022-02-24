import { useEffect, useState } from 'react';
import styled from 'styled-components'
import KeyMap from './keymap';


const { kakao } = window;

const Location = () => {
  const [key, setKey] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const handleSend = () => {
    setLocation(key);
  }
  
  useEffect(() => {
    
    
  }, []);

  return (
    <>
      <Input value={key} onChange={e => setKey(e.target.value)}></Input>
      <Button onClick={handleSend}>검색하기</Button>
      <KeyMap location={location}/>
      <GoBack>
        <LeftIcon>&laquo;</LeftIcon>
        <Text>돌아가기</Text>
      </GoBack>
    </>
  )
}

const Input = styled.input`
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
`

const Button = styled.button`
  position: fixed;
  top: 0;
  left: 200px;
  z-index: 20;
`

const GoBack = styled.div`
  width: 200px;
  height: 100px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 20;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: white;
  background-color: #448aff;
  border-radius: 10px;
  cursor: pointer;
`

const LeftIcon = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
`
const Text = styled.div`
  font-size: 25px;
  font-weight: bold;
`

export default Location;