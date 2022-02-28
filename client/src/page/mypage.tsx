import React from 'react';
import '../App.css';
import { Deactivate, EditInfo, EditPW } from '../page/index';
import { useState, useCallback,useEffect } from "react";
import url from '../url';
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/js/all.js';

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
  const [_groups, setGroups] = useState<Array<any>>([])
  const navigate = useNavigate();

  const clickGroup = (groupId:string) => {
    navigate(`/group/${groupId}`);
  }
  // const groupStatus = axios.get(
  //   `${url}/group/list`,
  // {withCredentials:true}
  // )

  useEffect(() => {      
  getGrouplist();
  },[]);
  
  // useEffect(() => {        
  // },[_groups]);
    

  const getGrouplist = () => {
  axios
  .get(
  `${url}/group/list`,
  {withCredentials:true}
  )
  .then((res) => {
  // console.log(res.data.groups)

    const filter = res.data.groups.map((el:any)=>{
    const date = new Date(el._group.time)
    const arr = date.toString().split(' ')
    const time = `${arr[1]} ${arr[2]} ${arr[4]}`
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
    })
  }

  const DeleteGrouplist = async (e:string) => {
  console.log(e);    
  await axios
  .delete(`${url}/group/${e}`, 
  {withCredentials:true}
  )
  const filter = _groups.filter((el)=>{
    return String(el.id)!== e
  })
  console.log("group successfully deleted");
  console.log(filter);
  setGroups([...filter])
  }

  return (  
  <MypageStyle>
    <UserGroup>
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
          <Box key={el.id}>
          <GroupName >
            <GroupNameText onClick={() => clickGroup(el.id)}>
            <GroupI>
            <div>{el.name}</div>
            <div>{el.place}</div>
            <div>{el.time}</div>
            </GroupI>
            </GroupNameText>
          </GroupName>
            <Group2>
            <GroupNameButton>
            <button>그룹정보로 이동 </button>
            </GroupNameButton>
              {/* <div> */}
                {/* <div > 그룹나가기 </div> */}
                <div id={el.id} onClick={ e => DeleteGrouplist(e.currentTarget.id)}>
                  <i className="fa-solid fa-arrow-right-from-bracket" id={el.id} onClick={ e => DeleteGrouplist(e.currentTarget.id)} />
                </div>
              {/* </div> */}

            </Group2>

          </Box>
          )
          })}
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
    </UserGroup>
  </MypageStyle>
  )
  }
  
  export default Mypage;

const DialogButton = styled.button`
  width: 160px;
  height: 48px;
  background-color: blueviolet;
  padding: 0px 10px 0px 10px;

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
  height: 30vh;
  font-size: 30px;
  text-align: left;
  width: 35vw;
  border-radius : 1px;
  border: solid blue;
`

const MypageStyle = styled.div`
  background-color: #e1bee7;
  width: 100vw;
  height: 100vh;
  font-size: 30px;
`
const UserinfoTitle = styled.div`
  padding: 15px 0px 15px 0px;
  border-radius : 1px;
  border: solid yellow;
`
const Userinfo = styled.div`
  background-color: #ffcdd2;
  display: flex;
  /* justify-content:space-around; */
  align-items: center;
  width:40vw;
  flex-direction: column;
  border-radius : 1px;
  border: solid blue;
  padding: 0px 0px 0px 0px;
  height:80vh;

  `
const Buttons = styled.div`
  display: flex;
  justify-content: right;
  width: 35vw;
  padding: 15px 0px 15px 0px;
  border-radius : 1px;
  border: solid red;
  
`
const Groupinfo = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius : 1px;
  border: solid pink;
`
const GroupBox = styled.div`
  padding: 15px;
  height: 50vh;
  overflow-y: scroll;
  width: 58vw;
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

const GroupNameText = styled.div`
  border-radius : 1px;
  border: solid yellow;
  

`

const GroupNameButton = styled.div`
  /* margin: 5px 10px 5px 0px; */
  /* border-radius : 1px;
  border: solid red; */
  cursor: pointer;
&:hover {
  transform: translateY(-1px);
  box-shadow: 5px 5px 4px #757575;

}
  //flex-wrap
  /* display:inline-block; */
`

const GroupI = styled.div`
  display:flex;
  width: 600px;
  height: 80px;
  div{
  width: 150px;    
  }
`


const Delete = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 20px;
`


const Box = styled.div`
display:flex;
justify-content:space-between;
`

const Group2 =styled.div`
display:flex;
flex-direction: row;
`


const UserGroup =styled.div`
  display:flex;
  flex-direction: row;
  margin: 0px 15px 0px 0px;
  border-radius : 3px;
  border: solid red;
`

