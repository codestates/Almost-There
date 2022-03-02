import axios from "axios";
import React, { useState } from "react";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import url from "../../url";

interface ModalDefaultType {
  setOpenModal: () => void;
}

interface User {
  userId: string,
  email: string,
  name: string
}

type editInfoProps = {
  user:User, setUser:React.Dispatch<React.SetStateAction<User>>,
  setOpenModal:React.Dispatch<React.SetStateAction<boolean>>
}

function EditInfo ({
  setOpenModal,
  user, setUser
  // children,
// }: PropsWithChildren<ModalDefaultType>)  {
}: editInfoProps)  {

  //setUSEr


// mypage 이동

  

  const [users, setUsers] = useState({
    email: `${user.email}`,
    name: `${user.name}`,
  });

  // const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");


  const handleInputValue = (key:string) => (e:React.ChangeEvent<HTMLInputElement>) => {
    setUsers({ ...users, [key]: e.target.value });
  }  
  //에러메세지 (handleInputValue)
  // Parameter 'key' implicitly has an 'any' type.
  // Parameter 'e' implicitly has an 'any' type.
  // Parameter 'key' implicitly has an 'any' type.

  // 회원정보 수정
  const handleUserinfo = () => {

    console.log('회원정보변경')
    console.log(users)
    if (
      users.email === "" ||
      users.name === "" 
      //회원정보 수정 항목에서 입력을 안할 경우
    ) {
      setErrorMessage("모든 항목입력은 필수입니다");
    } 
    const { email, name } = users;
    axios
      .put(
        
        `${url}/user/info`
        ,
        {
          email: email,
          name: name,
        },
        
        {
          withCredentials:true
        }
      )

      // then >> async/await 통일
      .then(() => {
        console.log("userinfo successfully updated");
        console.log(users)
        setUser({...user,name:users.name,email:users.email})
        setOpenModal(false)
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

          // if (setOpenModal) {
          //   setOpenModal();
          // }
        setOpenModal(false);
          
        }}
      >
      <DialogBox onClick={(e) => e.stopPropagation()}>
        <div className="mypage-input-box">  
        {/* <div> 모달창구성</div> */}
        <div>{errorMessage}</div>
        <div className="mypage-input-box-email">
            <EmailInput
              className="mypage-input"
              type="email"
              placeholder="변경할 이메일"
              onChange={handleInputValue('email')}
              value={users.email}
            />
            {/* </EmailInput>       */}

          </div>
          <div></div>

          {/* <div className="mypage-input-box-name">     */}
            <NameInput
              className="mypage-input"
              type="text"
              placeholder="변경할 이름"
              onChange={handleInputValue('name')}
              value={users.name}
            />
          </div>
          <button className="mypage-button" onClick={handleUserinfo}> 
              변경완료
          </button>
    {/* </div> */}
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

const EmailInput = styled.input`
  
  height:50px;
  border: 3px none;
  border-bottom: 2px solid rgb(165, 165, 165);
  margin: 20px 0px 20px 0px;
`;

const NameInput = styled.input`
  
  height:50px;
  border: 3px none;
  border-bottom: 2px solid rgb(165, 165, 165);
  margin: 0px 0px 120px 0px;
`;




export default EditInfo;