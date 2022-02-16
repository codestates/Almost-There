// import "./CSS/mypage.css"
import React from 'react';
import '../App.css';
// import { Mypage } from '../page/index'
// import {EditInfo} from 'react-modal';
import { EditInfo } from '../page/index';
import { useState, useCallback } from "react";
import styled from "styled-components";


function Mypage () {

  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal: () => void = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
  
  <MypageStyle>
    <Userinfo>
      <UserinfoTitle> 회원정보</UserinfoTitle>
      <UserinfoDetail>
        <div> 00000님 환영합니다 </div>  
        <div> 아이디</div>
        <div> 이메일 </div>
      </UserinfoDetail>
      <Buttons>
        <div>
          <button> 회원정보 수정</button>
          <button> 비밀번호 변경</button>
        </div>
      </Buttons>
    </Userinfo>
  
    <Groupinfo>
      <GroupTitle>그룹정보</GroupTitle>
      <GroupBox>
        <GroupName> 
          <div>
          test group1
          </div>
          <div>
            <button> 그룹나가기 </button>
          </div>
        </GroupName>
      
        <GroupName> 
          <div>
          test group2
          </div>
          <div>
            <button> 그룹나가기 </button>
          </div>

        </GroupName>
      
        <GroupName> 
          <div>
          test group3
          </div>
          <div>
            <button> 그룹나가기 </button>
          </div>

        </GroupName>
      </GroupBox>  
    </Groupinfo>
    <Delete>회원탈퇴</Delete>


    <div >
      {isOpenModal && (
        <EditInfo onClickToggleModal={onClickToggleModal}>
        </EditInfo>
      )}
      <DialogButton onClick={onClickToggleModal}>회원정보 수정</DialogButton>  
    </div>

  </MypageStyle>
  
  )
  }
  
  export default Mypage;





const DialogButton = styled.button`
  width: 160px;
  height: 48px;
  background-color: blueviolet;
  color: white;
  font-size: 1.2rem;
  font-weight: 400;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
  }
`;

const UserinfoDetail = styled.div`
  border-top: solid black 1px;
  border-bottom: solid black 1px;
  padding: 15px 0px 15px 0px;
  height: 20vh;
  font-size: 30px;
  text-align: left;
  width: 60vw;

`

const MypageStyle = styled.div`
  background-color: #e1bee7;
  height: 100vh;
  font-size: 30px;
`




const UserinfoTitle = styled.div`
  padding: 15px 0px 15px 0px;
`



const Userinfo = styled.div`
  background-color: #ffcdd2;
  display: flex;
  /* justify-content:space-around; */
  align-items: center;
  height: 50vh;
  flex-direction: column;
`




const Buttons = styled.div`
  display: flex;
  justify-content: right;
  width: 60vw;
  padding: 15px 0px 15px 0px;
`



const Groupinfo = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`



const GroupBox = styled.div`
  padding: 15px;
  height: 30vh;
  overflow-y: scroll;
  width: 60vw;
  border-top: solid black 1px;
  border-bottom: solid black 1px;
`


const GroupTitle = styled.div`
    padding: 15px 0px 15px 0px;
`
const GroupName = styled.div`
  display: flex;
  justify-content: space-between;  
`
const Delete = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 20px;
`
// const  = styled.div`
// `
// const  = styled.div`
// `
// const  = styled.div`
// `
// const  = styled.div`
// `




