import axios from "axios";
import React, { useState } from "react";
import { PropsWithChildren } from "react";
import styled from "styled-components";

interface ModalDefaultType {
  onClickToggleModalDeact: () => void;
}

function Deactivate ({
  onClickToggleModalDeact,
  children,
}: PropsWithChildren<ModalDefaultType>) {

  const deactivateID = () => {
    console.log('회원탈퇴')
    // const { PW, newPW} = changePW;
    axios
      .delete(
        `http://localhost:3000/user`,{data:{
          // PW: PW,
          // ID: ID,
        }}
        // url 변수로 변경예정
        
        ,
        
      )
      // async/await 변경
      .then(() => {
        console.log("password successfully updated");
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

      <div className="mypage-input-box">  
    <div> 정말로 회원탈퇴하시겠습니까?</div>
      <button onClick={deactivateID} > 
          회원탈퇴
      </button>

    </div>
    

      </DialogBox>

        
      </Backdrop>

    
    </div> 
  )
}


const DialogBox = styled.dialog`
  width: 800px;
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


export default Deactivate;