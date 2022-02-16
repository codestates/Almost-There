import axios from "axios";
import { userInfo } from "os";
import React, { useState } from "react";
import { PropsWithChildren } from "react";
import styled from "styled-components";


interface ModalDefaultType {
  onClickToggleModalPW: () => void;
}

function EditPW ({
  onClickToggleModalPW,
  children,
}: PropsWithChildren<ModalDefaultType>)  {


  // const [changePW, setchangePW] = useState({
  //   PW: "",
  //   newPW: "",
  // });

  // const [PWerrorMessage, setPWErrorMessage] = useState("");

  // const handleInputValue2 = (key) => (e) => {
  //   setchangePW({ ...changePW, [key]: e.target.value });
  // };

  // const handlePW = () => {
  //   if (
  //     userInfo.PW === "" ||
  //     userInfo.newPW === ""
  //   ) {
  //     setErrorMessage("모든 항목은 필수입니다");
  //   } else if (userInfo.PW!== userInfo.newPW) {
  //     setPWErrorMessage("비밀번호가 일치하지 않습니다");
  //   }
  //   const { PW, newPW} = userInfo;
  //   axios
  //     .patch(
  //       `http://localhost:4000/userinfo2`,
  //       // url 변수로 변경예정
  //       {
  //         PW: PW,
  //         newPW: newPW,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.accessToken}`,
  //         },
  //       }
  //     )
  //     // async/await 변경
  //     .then(() => {
  //       console.log("password successfully updated");
  //     })
  //     .catch((err) => {
  //       if (err) throw err;
  //     });
  // };


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
      <div className="mypage-input-box-email">      
        <input
          className="mypage-input"
          type="email"
          placeholder="변경할 비밀번호"
          // onChange={handleInputValue}
        />
      </div>
      <div className="mypage-input-box-name">      
        <input
          className="mypage-input"
          type="text"
          placeholder="비밀번호 변경확인"
          // onChange={handleInputValue}

        />
      </div>
      <button className="mypage-button" > 
          변경완료
      </button>

    </div>
    

      </DialogBox>

        
      </Backdrop>
    {/* </ModalContainer> */}

    </div>
  )
}


// const ModalContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: fixed;
//   background-color: yellow
// `;

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