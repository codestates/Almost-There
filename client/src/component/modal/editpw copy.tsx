import axios from "axios";
import React, { useState } from "react";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import url from "../../url";

interface ModalDefaultType {
  onClickToggleModalPW: () => void;
}

function EditPW ({
  onClickToggleModalPW,
  children,
}: PropsWithChildren<ModalDefaultType>)  {


  const [changePW, setchangePW] = useState({
    password: null,
    newPassword: "",
  });

  const [PWerrorMessage, setPWErrorMessage] = useState("");

  const handleInputValue2 = (key :string) => (e:React.ChangeEvent<HTMLInputElement>) => {
    setchangePW({ ...changePW, [key]: e.target.value });
  };

  const handlePW = () => {
    console.log('비밀번호변경')
    console.log(changePW)

    if (
      changePW.password === "" ||
      changePW.newPassword !== changePW.password
    ) {
      setPWErrorMessage("변경할 비밀번호를 정확하게 입력해주세요")}
      else if (changePW.password!== changePW.newPassword) {
        console.log('비밀번호 불일치')
      setPWErrorMessage("현재 비밀번호가 일치하지 않습니다");
    }
    const { password, newPassword} = changePW;
    axios
      .put(
        `${url}/user/password`,
        {
          password: password,
          newPassword: newPassword,
        },
        {withCredentials:true}
      )
      .then(() => {
        console.log("password successfully updated");
      })
      .catch((err) => {
        console.log('error')
        if (err) throw err;
      });
  };

  return(
    <div>
      <Backdrop onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickToggleModalPW) {
            onClickToggleModalPW();
          }
        }}
      >
      <DialogBox onClick={(e) => e.stopPropagation()}>
      <div className="mypage-input-box">  
      <div> 모달창구성</div>
      <div >      
        <input
          type="text"
          placeholder="현재 비밀번호"
          onChange={handleInputValue2('password')}
        />
        <div>{PWerrorMessage}</div>
      </div>
      <div className="mypage-input-box-email">      
        <input
          className="mypage-input"
          type="text"
          placeholder="변경할 비밀번호"
          onChange={handleInputValue2('newPassword')}
        />
        <div>{PWerrorMessage}</div>
      </div>
      <div className="mypage-input-box-name">      
        <input
          className="mypage-input"
          type="text"
          placeholder="비밀번호 변경확인"
          onChange={handleInputValue2('newPassword')}
        />
      </div>
      <button className="mypage-button" onClick={handlePW} > 
          변경완료
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



export default EditPW;