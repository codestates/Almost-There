import axios from "axios";
import React, { useState } from "react";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import url from "../../url";

interface ModalDefaultType {
  setOpenModalPW: () => void;
}

interface Password {
  password: number

}

type editPWProps = {
  setOpenModalPW:React.Dispatch<React.SetStateAction<boolean>>
}

function EditPW ({
  setOpenModalPW,
  // onClickToggleModalPW,
  // children,
}: editPWProps)  {


  const [changePW, setchangePW] = useState({
    password: null,
    newPassword: "",
    confirmPW : "",
  });

  const [PWerrorMessage, setPWErrorMessage] = useState("");

  const handleInputValue2 = (key :string) => (e:React.ChangeEvent<HTMLInputElement>) => {
    setchangePW({ ...changePW, [key]: e.target.value });
  };

  const handlePW = () => {
    console.log('비밀번호변경')
    console.log(changePW)

  if (changePW.confirmPW!== changePW.newPassword) {
      console.log('비밀번호 불일치')
      setPWErrorMessage("변경할 비밀번호가 일치하지 않습니다");
    }
  else{
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
      setPWErrorMessage("현재 비밀번호가 일치하지 않습니다");
    });
} 
  };


  return(
    <div>
      <Backdrop onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          // if (onClickToggleModalPW) {
          //   onClickToggleModalPW();
          // }
        setOpenModalPW((false))
        }}
      >
      <DialogBox onClick={(e) => e.stopPropagation()}>
      <div className="mypage-input-box">  
      {/* <div> 모달창구성</div> */}
      <div >      
        <PWInput
          type="text"
          placeholder="현재 비밀번호"
          onChange={handleInputValue2('password')}
        />
      </div>
      <div className="mypage-input-box-email">      
        <NewPWInput
          className="mypage-input"
          type="text"
          placeholder="변경할 비밀번호"
          onChange={handleInputValue2('newPassword')}
        />
      </div>
      <div className="mypage-input-box-name">      
        <PWCheck
          className="mypage-input"
          type="text"
          placeholder="비밀번호 변경확인"
          onChange={handleInputValue2('confirmPW')}
        />
      </div>

      <button className="mypage-button" onClick={handlePW} > 
          변경완료
      </button>
      <div>{PWerrorMessage}</div>

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

const PWInput = styled.input`
  
  height:50px;
  border: 3px none;
  border-bottom: 2px solid rgb(165, 165, 165);
  margin: 10px 0px 10px 0px;
`;

const NewPWInput = styled.input`
  
  height:50px;
  border: 3px none;
  border-bottom: 2px solid rgb(165, 165, 165);
  margin: 10px 0px 10px 0px;
`;

const PWCheck = styled.input`
  
  height:50px;
  border: 3px none;
  border-bottom: 2px solid rgb(165, 165, 165);
  margin: 10px 0px 90px 0px;
`;


export default EditPW;