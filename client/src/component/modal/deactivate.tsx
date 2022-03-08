import axios from "axios";
import React, { useState } from "react";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import url from "../../url";
import '@fortawesome/fontawesome-free/js/all'
import { useNavigate } from 'react-router-dom';
import { setFlagsFromString } from 'v8';


interface ModalDefaultType {
  onClickToggleModalDeact: () => void;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>,
  setAlarm: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<User>>,
}

function Deactivate ({
  onClickToggleModalDeact,
  children,
  setLogin, setAlarm, setUser
}: PropsWithChildren<ModalDefaultType>) {
  const navigate = useNavigate();
  const deactivateID = () => {
    console.log('회원탈퇴')
    // const { PW, newPW} = changePW;
    axios
      .delete(
        `${url}/user`,
        {withCredentials:true}
        // url 변수로 변경예정        
        ,
      )
      // async/await 변경
      .then(() => {
        console.log("password successfully deleted");
        onClickToggleModalDeact();
        setAlarm(false);
        setUser({
          userId: '', name: '', email: ''
        })
        setLogin(false);
        navigate('/');
      })
      .catch((err) => {
        if (err) throw err;
      });
  };



  return (
    <div>
    <Backdrop onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModalDeact) {
            onClickToggleModalDeact();
          }
        }}
      >
      <DialogBox onClick={(e) => e.stopPropagation()}>
        <Message1 className="mypage-input-box"> 
            정말로 회원탈퇴하시겠습니까?
            <Icon>
              <i className="fa-solid fa-circle-exclamation fa-2x"></i>
            </Icon>
        </Message1>
        <div className="mypage-input-box">  
        {/* <div> 정말로 회원탈퇴하시겠습니까?</div> */}
        <Button1 onClick={deactivateID}> 
            회원탈퇴
        </Button1>
      </div>
      </DialogBox>
    </Backdrop>

    
    </div> 
  )
}


const DialogBox = styled.dialog`
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
  vertical-align:middle;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 600px) {
    width:100vw
  }

`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Message1 = styled.div`
font-size: 40px;
background-color: white;
margin-bottom: 60px;
`

const Icon = styled.div`

`
  const Button1 = styled.div`
    font-size: 40px;
    background-color: white;
    vertical-align:middle;
    :hover {
    background-color: #1a1a1a;
    color: white;
    cursor: pointer;
  }

`


export default Deactivate;