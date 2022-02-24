import React from 'react';
import '../App.css';
import { Deactivate, EditInfo, EditPW } from '../page/index';
import { useState, useCallback,useEffect } from "react";
import url from '../url';
import axios from "axios";

import styled from "styled-components";

interface User {
  userId: string,
  email: string,
  name: string
}



type mypageprops = {
  user:User, setUser:React.Dispatch<React.SetStateAction<User>>
}

function Mypage ({user,setUser}:mypageprops) {

  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = () => {
    setOpenModal(!isOpenModal);
  };
  const [isOpenModalPW, setOpenModalPW] = useState<boolean>(false);
  const onClickToggleModalPW = () => {
    setOpenModalPW(!isOpenModalPW);
  };
  const [isOpenModalDeact, setOpenModalDeact] = useState<boolean>(false);
  const onClickToggleModalDeact: () => void = useCallback(() => {
    setOpenModalDeact(!isOpenModalDeact);
  }, [isOpenModalDeact]);

  //   const [groupList, setgroupList] = useState({
  //   groupId:"생성된 그룹없음"
  // });

    const [_groups, setGroups] = useState<Array<any>>([ ])


    
    useEffect(() => {
      
      getGrouplist();
    },[]);
    // 그룹상태가 바뀔때마다 useeffect사용하여 그룹리스트 불러옴
  
  const getGrouplist = () => {
    // console.log('test')
    axios
    .get(
      `${url}/group/list`,
      // `http://localhost:4000/group/list`,
      {withCredentials:true}
    )
    .then((res) => {
      const filter = res.data.groups.map((el:any)=>{
        return {
                name : el._group.name,
                id: el._group.id
              }
      })      // console.log("grouplist successfully inquired");
      console.log(res.data.groups[0]._group.name)
      console.log(res.data.groups)
      // setGroups(res.data.groups[0]._group)    
      setGroups([...filter])    

      //res.data.groups.map (el)=> {el._group.name}

    })
    .catch((err) => {
    });

  }

  const DeleteGrouplist = (e:string) => {
    // console.log(res.data)

    console.log("test");    
    axios
    .delete(
      
      `${url}/group/${e}`, 
      // event.target.id로 불러오기 가능?
      // {

      // },
      // `${url}/group/list/${_groups.id}`, 
      //grouplist중 groups.id에 해당하는 그룹만 삭제해야함
      // e.currentTarget.id

      {withCredentials:true}
    )
    .then(() => {
      console.log("group successfully deleted");
    })
    .catch((err) => {
    });
  }
  // 완성후 그룹탈퇴버튼에 이벤트

  return (
  
  <MypageStyle>
    <Userinfo>
      <UserinfoTitle> 회원정보</UserinfoTitle>     
      <UserinfoDetail>
        <div> {user.name}님 환영합니다 </div>  
        <div> {user.userId}</div>
        <div> {user.email} </div>
      </UserinfoDetail>
      <Buttons>
        <div>
        <div >
          {isOpenModal && (
          <EditInfo setUser={setUser} user={user} setOpenModal={setOpenModal}/>
          )}
      <DialogButton onClick={onClickToggleModal}>회원정보 수정</DialogButton>  
        </div>
        </div>
      </Buttons>
      <Buttons>
      <div>
        <div >
          {isOpenModalPW && (
          <EditPW setOpenModalPW={setOpenModalPW}/>
          )}
      <DialogButton onClick={onClickToggleModalPW}>비밀번호 변경</DialogButton>  
        </div>        
        </div>
      </Buttons>
    </Userinfo>
    <Groupinfo>
      <GroupTitle>그룹정보</GroupTitle>
      <GroupBox>
          
          {_groups.map((el)=>{
            return (
          <Box>
          <GroupName key={el.id}>
              {el.name}
            </GroupName>
            <div>
              <button id={el.id} onClick={ e => DeleteGrouplist(e.currentTarget.id)}> 그룹나가기 </button>
            </div>

          </Box>
              )
          })}
          
          {/* <div>
            <button onClick={DeleteGrouplist}> 그룹나가기 </button>
          </div> */}
        {/* <GroupName> 
          <div>
            aaaaa
          </div>
          <div>
            <button onClick={DeleteGrouplist}> 그룹나가기 </button>
          </div>
        </GroupName> */}

      </GroupBox>  
    </Groupinfo>
    <Delete>
      <div >
      {isOpenModalDeact && (
        <Deactivate onClickToggleModalDeact={onClickToggleModalDeact}>
        </Deactivate>
      )}
      <DialogButton onClick={onClickToggleModalDeact}>회원탈퇴</DialogButton>  
    </div>

      </Delete>

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
  height: 140px;
  overflow-y: scroll;
  width: 60vw;
  border-top: solid black 1px;
  border-bottom: solid black 1px;
`

const Box = styled.div`
display:flex;
justify-content:space-between
//margin
`;

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




