import React from 'react';
import '../App.css';
import { Deactivate, EditInfo, EditPW } from '../page/index';
import { useState, useCallback,useEffect } from "react";
import url from '../url';
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/js/all.js';
import { socket } from '../context';

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
  const [isOpenModalPW, setOpenModalPW] = useState<boolean>(false);
  const [isOpenModalDeact, setOpenModalDeact] = useState<boolean>(false);
  const [_groups, setGroups] = useState<Array<any>>([])
  const navigate = useNavigate();
  const month = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  const onClickToggleModal = () => {
    setOpenModal(!isOpenModal);
  };

  const onClickToggleModalPW = () => {
    setOpenModalPW(!isOpenModalPW);
  };

  const onClickToggleModalDeact: () => void = useCallback(() => {
    setOpenModalDeact(!isOpenModalDeact);
  }, [isOpenModalDeact]);

  const clickGroup = (groupId:string) => {
    navigate(`/group/${groupId}`);
  }

  const getGrouplist = async () => {
    const res = await axios.get(`${url}/group/list`,{withCredentials:true})
    const filter = res.data.groups.map((el:any)=>{
      const date = new Date(el._group.time);
      const arr = date.toString().split(' ');
      arr[1] = month.indexOf(arr[1]).toString();
      const time = `${arr[1]}월 ${arr[2]}일 ${arr[4].slice(0, 5)}`;
      console.log(date)
      //Sun Jan 02 2022 00:00:00 GMT+0900 (한국 표준시)
      return {
        name : el._group.name,
        id: el._group.id,
        place:el._group.place,
        time
      }
    })
    console.log(filter)
    // console.log(res.data.groups[0]._group.name)
    // console.log(res.data.groups)
    setGroups([...filter])    
  }

  const DeleteGrouplist = async (e:string) => {
    console.log(e);    
    await axios.delete(`${url}/group/${e}`, { withCredentials:true })
    const filter = _groups.filter((el)=>{
      return String(el.id)!== e
    })
    socket.emit("leaveGroup", e, user.userId);
    console.log("group successfully deleted");
    console.log(filter);
    setGroups([...filter])
  }

  useEffect(() => {      
    getGrouplist();
  },[]);

  return (  
  <MypageStyle>
    <UserGroup>
      <Userinfo>
        <UserinfoTitle> {user.name}님 환영합니다</UserinfoTitle>     
        <UserinfoDetail>
          <div> id : {user.userId}</div>
          <div> email : {user.email} </div>
        </UserinfoDetail>
        <Buttons>
          {isOpenModal && (
            <EditInfo setUser={setUser} user={user} setOpenModal={setOpenModal}/>
          )}
          <DialogButton onClick={onClickToggleModal}>회원정보 수정</DialogButton>  
          {isOpenModalPW && (
            <EditPW setOpenModalPW={setOpenModalPW}/>
          )}
          <DialogButton onClick={onClickToggleModalPW}>비밀번호 변경</DialogButton>  
          {isOpenModalDeact && (
              <Deactivate onClickToggleModalDeact={onClickToggleModalDeact}>
              </Deactivate>
            )}
          <DialogButton onClick={onClickToggleModalDeact}>회원탈퇴</DialogButton>  
        </Buttons>
        <Delete>
          <div >
            
          </div>
        </Delete>
      </Userinfo>
      <Groupinfo>
        <GroupTitle>그룹 리스트</GroupTitle>
        {_groups.length === 0
          ? <EmptyBox>
              <div>소속된 그룹이 없습니다.</div>
              <DialogButton onClick={() => navigate('/creategroup')}>그룹 생성하기</DialogButton>
            </EmptyBox>
          : <GroupBox>
              {_groups.map((el)=>{
                return (
                  <Box key={el.id}>
                    <GroupName onClick={() => clickGroup(el.id)}>
                      <GroupNameText>
                        <GroupI>
                          <div>{el.name}</div>
                          <div className='place'>{el.place}</div>
                          <div className='time'>{el.time}</div>
                        </GroupI>
                      </GroupNameText>
                    </GroupName>
                    <Group2 id={el.id} onClick={ e => DeleteGrouplist(e.currentTarget.id)}>
                      <div className="out"> 그룹나가기 </div>
                      <div className="icon" id={el.id}>
                        {/* <i className="fa-solid fa-arrow-right-from-bracket" id={el.id} onClick={ e => DeleteGrouplist(e.currentTarget.id)} /> */}
                        <i className="fa-solid fa-trash-can"></i>
                      </div>
                    </Group2>
                  </Box>
                )
              })}
            </GroupBox>  
        }
      </Groupinfo>
    </UserGroup>
  </MypageStyle>
  )
}

const DialogButton = styled.button`
  width: 120px;
  height: 40px;
  background-color: blueviolet;
  padding: 0px 10px 0px 10px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  margin: 5px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  &:hover {
    transform: translateY(-1px);
  }
  @media screen and (max-width: 760px) {
    font-size: 12px;
  }
`;

const UserinfoDetail = styled.div`
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  border-top: solid black 1px;
  border-bottom: solid black 1px;
  padding: 15px 0px 15px 0px;
  font-size: 20px;
  text-align: left;
  border-radius : 1px;
  /* border: solid blue; */
  div {
    padding: 10px;
  }
`
const MypageStyle = styled.div`
  /* background-color: #e1bee7; */
  width: 100vw;
  height: 93vh;
  font-size: 30px;
  @media screen and (max-width: 760px) {
    height: 100%;
  }
`
const UserinfoTitle = styled.div`
  padding: 15px 0px 15px 0px;
  border-radius : 1px;
  /* border: solid yellow; */
`
const Userinfo = styled.div`
  width:300px;
  height: 90vh;
  background-color: #eeeeee;
  display: flex;
  /* justify-content:space-around; */
  align-items: center;
  flex-direction: column;
  border-radius : 1px;
  border: solid black;
  margin: 10px;
  padding: 0px 0px 0px 0px;
  @media screen and (max-width: 760px) { 
    width: 450px;
    height: 300px;
  }
`
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 300px;
  height: 100%;
  padding: 15px 0px 15px 0px;
  border-radius : 1px;
  /* border: solid red; */
  @media screen and (max-width: 760px) {
    flex-direction: row;
  }
`
const Groupinfo = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius : 1px;
  /* border: solid pink; */
`
const GroupBox = styled.div`
  padding: 15px;
  height: 50vh;
  overflow-y: scroll;
  /* width: 58vw; */
  width: 800px;
  border-top: solid black 1px;
  border-bottom: solid black 1px;
  @media screen and (max-width: 1080px){
    width: 600px;
  }
  @media screen and (max-width: 960px){
    width: 450px;
  }
  @media screen and (max-width: 760px){
    width: 400px;
  }
`
const GroupTitle = styled.div`
  padding: 15px 0px 15px 0px;
`
const GroupName = styled.div`
  display: flex;
  justify-content: space-between;  
  border: solid black 1px;
  &:hover {
    cursor: pointer;
    transform: translateY(-1px);
    box-shadow: 5px 5px 4px #757575;
  }
`
const GroupNameText = styled.div`
  border-radius : 1px;
  /* border: solid yellow; */
`
const GroupI = styled.div`
  display:flex;
  justify-content: space-evenly;
  align-items: center;
  width: 600px;
  height: 80px;
  div {
    width: 150px;
    &.place {
      font-size: 20px;
    }
    &.time {
      font-size: 20px;
    }
  }
  @media screen and (max-width: 1080px){
    width: 400px;
    div {
      &.place {
        display: none;
      }
    }
  }
  @media screen and (max-width: 960px){
    width: 300px;
    div {
      &.place {
        display: none;
      }
    }
  }
  @media screen and (max-width: 760px){
    width: 300px;
    div {
      &.place {
        display: none;
      }
      &.time {
        /* display: none; */
      }
    }
  }
`
const Delete = styled.div`
  /* position: absolute; */
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: right;
  align-items: center;
  font-size: 20px;
  /* background-color: blue; */
  /* border: solid black 1px; */
`
const Box = styled.div`
  display:flex;
  /* justify-content:space-between; */
`
const Group2 =styled.div`
  width: 180px;
  font-size: 15px;
  display:flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  background-color: #448aff;
  border-radius: 10px;
  :hover {
    cursor: pointer;
    transform: translateY(-1px);
    box-shadow: 5px 5px 4px #757575;
  }
  div {
    margin: 5px;
    &.icon {
      font-size: 30px;
    }
  }
  @media screen and (max-width: 960px) {
    width: 100px;
    background-color: #e1bee7;
    div {
      &.out {
        display: none;
      }
    }
  }
`
const UserGroup =styled.div`
  display:flex;
  width: 100vw;
  height: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 0px 15px 0px 0px;
  border-radius : 3px;
  border: solid blue;
  @media screen and (max-width: 760px){
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
const EmptyBox = styled.div`
  height: 50vh;
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 15px;
  border-top: solid black 1px;
  border-bottom: solid black 1px;
  @media screen and (max-width: 1080px){
    width: 600px;
  }
  @media screen and (max-width: 960px){
    width: 450px;
  }
  @media screen and (max-width: 760px){
    width: 400px;
  }
`

export default Mypage;