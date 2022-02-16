// import { useHistory } from "react-router-dom";
// import "./CSS/mypage.css"
import axios from "axios";
import React, { useState } from "react";
import { PropsWithChildren } from "react";
import styled from "styled-components";


interface ModalDefaultType {
  onClickToggleModal: () => void;
}


function EditInfo ({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>)  {

  // (alias) function EditInfo({ 
  //  onClickToggleModal, 
  //children, 
  //}: PropsWithChildren<ModalDefaultType>): JSX.Element
  // import EditInfo


// mypage 이동
  const [users, setUsers] = useState({
    name: "",
    email: "",
    id: "",
  });

  // const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");


  // const handleInputValue = (key) => (e) => {
  //   setUsers({ ...users, [key]: e.target.value });
  // }

  //에러메세지 (handleInputValue)
  // Parameter 'key' implicitly has an 'any' type.
  // Parameter 'e' implicitly has an 'any' type.
  // Parameter 'key' implicitly has an 'any' type.

  // 회원정보 수정
  const handleUserinfo = () => {
    if (
      users.email === "" ||
      users.name === "" 
      //회원정보 수정 항목에서 입력을 안할 경우
    ) {
      setErrorMessage("모든 항목입력은 필수입니다");
    } 
    const { email, name } = users;
    axios
      .patch(
        //put
        `http://localhost:4000`,
        {
          email: email,
          name: name,
        },
        // axios patch 로 이메일, 이름 정보 업데이트
        {
          withCredentials:true
        }
      )
      // then >> async/await 통일
      .then(() => {
        console.log("userinfo successfully updated");
        // history.push("/");
        // 회원정보 수정후 기본경로로 이동
        // 모달 사라지고 끝남
      })
      .catch((err) => {
        if (err) throw err;
      });
  };






  return(
    <div>

{/* <Background onClick={clickBack}>
      <Container onClick={(e) => e.stopPropagation()}></Container> */}


    {/* <ModalContainer> */}
      <Backdrop onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      >
      <DialogBox onClick={(e) => e.stopPropagation()}>

      <div className="mypage-input-box">  
    <div> 모달창구성</div>
    <div>{errorMessage}</div>
      <div className="mypage-input-box-email">      
        <input
          className="mypage-input"
          type="email"
          placeholder="변경할 이메일"
          // onChange={handleInputValue}
          // value >> state로 
        />
      </div>
      <div className="mypage-input-box-name">      
        <input
          className="mypage-input"
          type="text"
          placeholder="변경할 이름"
          // onChange={handleInputValue}

        />
      </div>
      <button className="mypage-button" onClick={handleUserinfo}> 
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



export default EditInfo;