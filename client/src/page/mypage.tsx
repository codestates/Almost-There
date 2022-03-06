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
    socket.emit("notify", "leave", user.userId, e);
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
      {isOpenModal && (
        <EditInfo setUser={setUser} user={user} setOpenModal={setOpenModal}/>
      )}
      {isOpenModalPW && (
        <EditPW setOpenModalPW={setOpenModalPW}/>
      )}
      {isOpenModalDeact && (
        <Deactivate onClickToggleModalDeact={onClickToggleModalDeact}>
        </Deactivate>
      )}
      <Groupinfo>
        <GroupListTitle>
          {user.name}님 환영합니다.
        </GroupListTitle>
        <GroupListTitle2>
          <div>
            {user.userId} 
          </div>
          <div>
            {user.email}
          </div>
          <Icon>
            <div onClick={onClickToggleModal}>
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <div onClick={onClickToggleModalPW}>
              <i className="fa-solid fa-key"></i>
            </div>
            <div onClick={onClickToggleModalDeact}>
              <i className="fa-solid fa-user-slash"></i>
            </div>
          </Icon>
        </GroupListTitle2>
        {_groups.length === 0
          ? <EmptyBox>
              <div>소속된 그룹이 없습니다.</div>
              <DialogButton onClick={() => navigate('/creategroup')}>그룹 생성하기</DialogButton>
            </EmptyBox>
          : <GroupBox>
              {_groups.map((el)=>{
                return (
                  <Box key={el.id}>
                    <GroupInfoBox>
                      <GroupNameText onClick={() => clickGroup(el.id)}>
                        <div>{el.name}</div>
                      </GroupNameText>
                      <GroupI>
                        <div className='place'>{el.place}</div>
                        <div className='time'>{el.time}</div>
                      </GroupI>
                    </GroupInfoBox>
                    <ButtonList>
                      <Button onClick={() => clickGroup(el.id)}>
                        <div className='icon'>
                          <i className="fa-solid fa-arrow-right-to-bracket"></i>
                        </div>
                      </Button>
                      <Button id={el.id} onClick={ e => DeleteGrouplist(e.currentTarget.id)}>
                        <div className="icon" id={el.id}>
                          <i className="fa-solid fa-trash-can"></i>
                        </div>
                      </Button>
                    </ButtonList>
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

const MypageStyle = styled.div`
  background-color: #fefefe;
  width: 100vw;
  height: 93vh;
  @media screen and (max-width: 760px) {
    height: 100%;
  }
  @media screen and (max-width: 400px) {
    width: 100vw;
  }
`
const UserGroup =styled.div`
  display:flex;
  flex-direction: column;
  width: 100vw;
  height: 100%;
  margin: 0px 15px 0px 0px;
  border-radius : 5px;
  /* border: solid blue; */
  @media screen and (max-width: 760px){
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
const GroupListTitle = styled.div`
  padding: 15px 0px 15px 0px;
  font-size: 30px;
`
const GroupListTitle2 = styled.div`
  width : 360px;
  font-size: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  div {
    margin: 0px 5px;
  }
  @media screen and (max-width: 550px) {
    font-size: 15px;
    flex-direction: column;
    
  }
`
const Icon = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  div {
    :hover {
      cursor: pointer;
    }
  }
`
const GroupBox = styled.div`
  padding: 15px;
  overflow-y: scroll;
  /* width: 58vw; */
  width: 880px;
  display: flex;
  flex-wrap: wrap;
  border-top: solid black 1px;
  border-bottom: solid black 1px;
  @media screen and (max-width: 960px){
    width: 590px;
  }
  @media screen and (max-width: 760px){
    width: 400px;
  }
  @media screen and (max-width: 400px) {
    width: 90vw;
  }
`
const Box = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 240px;
  height: 360px;
  margin: 20px;
  box-shadow: 0px 0px 5px black;
  border-radius: 10px;
  :hover {
    transition: 1s;
    transform: translateY(-10px);
  }
  @media screen and (max-width: 760px){
    width: 380px;
  }
  @media screen and (max-width: 400px) {
    width: 70vw;
  }
`
const GroupInfoBox = styled.div`
  width: 240px;
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;  
  align-items: center;
  border-bottom: solid black 1px;
  border-radius: 10px 10px 0px 0px;
  background-color: #eceff1;
  @media screen and (max-width: 760px){
    width: 330px;
  }
  @media screen and (max-width: 400px) {
    width: 70vw;
  }
`
const GroupNameText = styled.div`
  width: fit-content;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius : 20px;
  margin-top: 5px;
  padding: 10px;
  font-size: 25px;
  font-weight: 900;
  :hover {
    background-color: black;
    color: white;
    cursor: pointer;
  }
`
const GroupI = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* border: solid black 1px; */
  height: 210px;
  div {
    margin: 10px;
    &.place {
      width: 100%;
      padding: 0px 20px;
      height: 60px;
      font-size: 20px;
      /* border: solid black 1px; */
    }
    &.time {
      font-size: 20px;
      font-weight: 600;
    }
  }
`
const ButtonList = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fefefe;
  border-radius: 0px 0px 10px 10px;
  width: 100%;
`
const Button =styled.div`
  width: 80px;
  height: 45px;
  font-size: 15px;
  display:flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  background-color: #aaaaaa;
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
  @media screen and (max-width: 760px) {
    
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
  @media screen and (max-width: 400px) {
    width: 90vw;
  }
`

const DialogButton = styled.button`
  width: 120px;
  height: 40px;
  background-color: #aaaaaa;
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


export default Mypage;