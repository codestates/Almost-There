import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import KeyMap from './keymap';

interface Place {
  name: string,
  x: string,
  y: string
}

type LocationProps = {
  setModal: React.Dispatch<React.SetStateAction<Show>>
  setPlace: React.Dispatch<React.SetStateAction<Place>>
}

const Location = ({ setModal, setPlace }: LocationProps) => {
  const [key, setKey] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const handleSend = () => {
    setLocation(key);
  }
  
  const handleBack = () => {
    setModal({
      calendar: false,
      location: false,
      invite: false
    })
  }

  useEffect(() => {
    
    
  }, []);

  return (
    <>
      <Input value={key} onChange={e => setKey(e.target.value)}></Input>
      <Button onClick={handleSend}>검색하기</Button>
      <KeyMap location={location} setPlace={setPlace} setModal={setModal}/>
      <GoBack onClick={handleBack}>
        {/* <LeftIcon></LeftIcon> */}
        <Text>돌아가기</Text>
      </GoBack>
    </>
  )
}

const Input = styled.input`
  width: 165px;
  position: fixed;
  top: 5px;
  left: 20px;
  z-index: 20;
`
const Button = styled.button`
  position: fixed;
  top: 5px;
  left: 185px;
  z-index: 20;
  cursor: pointer;
  :hover {
    background-color: black;
    color: white;
  }
`
const GoBack = styled.div`
  width: 150px;
  height: 75px;
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