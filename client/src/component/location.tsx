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
    <BackDrop onClick={handleBack}>
      <View onClick={e => e.stopPropagation()}>
        <Search>
          <Input value={key} onChange={e => setKey(e.target.value)} autoFocus></Input>
          <Button onClick={handleSend}>검색하기</Button>
        </Search>
        <KeyMap location={location} setPlace={setPlace} setModal={setModal}/>
      </View>
    </BackDrop>
  )
}

const BackDrop = styled.div`
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
`
const Search = styled.div`
  position: fixed;
  z-index: 15;
  left: 10%;
  right: 10%;
  display: flex;
  justify-content: center;
`
const Input = styled.input`
  width: 200px;
  height: 50px;
  font-size: 20px;
  padding: 0px 5px;
  position: relative;
  border-radius: 10px 0px 0px 10px;
  z-index: 20;
`
const Button = styled.div`
  position: relative;
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: #448aff;
  border-radius: 0 10px 10px 0;
  color: white;
  z-index: 20;
  cursor: pointer;
  :hover {
    background-color: black;
    color: white;
  }
`

export default Location;