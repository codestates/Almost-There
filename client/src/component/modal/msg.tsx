import React from 'react';
import styled from 'styled-components';

type MsgModalProps = {
  msg: string
  setView: React.Dispatch<React.SetStateAction<boolean>>
}

const MsgModal = ({ msg, setView }: MsgModalProps) => {
  const handleModal = () => {
    setView(false);
  }

  return (
    <Backdrop onClick={handleModal}>
      <View>
        <div>{msg}</div>
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
  z-index: 12;
  background-color: rgba(0, 0, 0, 0.3);
  display:flex;
  justify-content:center;
  align-items:center;
`

const View = styled.div`
  position: fixed;
  z-index: 13;
  width: 200px;
  height: 100px;
  margin-bottom: 20%;
  background-color: #eeeeee;
  display: flex;
  place-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  div {
    width: 150px;
    height: 40px;
  }
`

export default MsgModal;