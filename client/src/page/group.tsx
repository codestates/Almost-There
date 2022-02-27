import styled from 'styled-components';
import { Timer } from '../component';
import React from 'react';
import '../App.css';
import { useState, useCallback,useEffect } from "react";
import url from '../url';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

interface GroupInfo {
  name: string,
  place: string,
  time: string,
  leaderId: string,
  x: string,
  y: string
}
interface Member {
  userId: string,
  overtime: string
}

type GroupProps = {
  user: User
}

function Group ({ user }: GroupProps) {
  const [groupInfo, setGroupInfo] = useState<GroupInfo>();
  const [member, setMember] = useState<Array<Member>>([]);
  const [arriveTime, setArriveTime] = useState<Array<string>>([]);
  const navigate = useNavigate();
  const params= useParams();
  let date: Array<any>;

//   groupInfo:
//     createdAt: "2022-02-27T02:17:14.000Z"
//     id: 1
//     leaderId: "test"
//     name: "group1"
//     place: "남산서울타워"
//     time: "2022-02-27T16:00:00.000Z"
//     updatedAt: "2022-02-27T02:17:14.000Z"
//     x: "126.988217046052"
//     y: "37.551279740966"
//   member: Array(3)
//     0: "test"
//     1: "test2"
//     2: "test3"
  const getGroupInfo = async () => {
    const res = await axios.get(`${url}/group/memberInfo?groupId=${params.id}`,{withCredentials:true});
    const { name, place, leaderId, x, y } = res.data.groupInfo;
    date = res.data.groupInfo.time.split(/[TZ\:\.-]/);
    console.log(date); 
    date[3] = Number(date[3]) + 9 > 24 ? `${Number(date[3]) + 9 - 24}` : `${Number(date[3]) + 9}`;
    date[3] = Number(date[3]) > 11 
      ? Number(date[3]) !== 12 ? `오후 ${Number(date[3])}` : `오후 ${date[3]}`
      : `오전 ${date[3]}`;
    const time = `${date[1]}월 ${date[2]}일 ${date[3]}시 ${date[4]}분`;
    setGroupInfo({name, place, time, leaderId, x, y});
    const mapping = res.data.member.map((el:any) => {
      let arr = el.overtime.split(':');
      arr[0] = Number(arr[0]) + Number(date[3].slice(3));
      // if (Number(arr[0]) > 24);
      // arr[1] = `${Number(arr[1]) + Number(date[4])}`;
      // if (Number(arr[1]) > 59) {
      //   arr[0] = `${Number(arr[0]) + 1}`;
      // }
      let overtime = arr.join(':');
      return { userId: el.userId, overtime: overtime}
    })
    setMember([...res.data.member]);
  }
  const clickMap = () => {
    navigate(`/map/${params.id}`);
  }

  const checkPosition = (userId: string) => {
    navigate(`/map/${params.id}/${userId}`);
  }

  useEffect(() => {     
    getGroupInfo();
  },[]);  
    
  return (
    <Background>
      <Container>
        <Contents1>
          <List1>
            <Title1 onClick={getGroupInfo} >{groupInfo?.name}</Title1>
          </List1>
          <List1>
            <Title1>{groupInfo?.place}</Title1>
            <Icon onClick={clickMap}>지도</Icon>
          </List1>
          <List1>
            <Title3>{groupInfo?.time}</Title3>
          </List1>
        </Contents1>
        <Timer />
        <Contents3>
          <Title2><button>시간 추가</button></Title2>
          <List2>
            {
              member.map((el) => {
                return (
                  <Li key={el.userId}>
                    <NameBox>{el.userId}</NameBox>
                    <PosBox onClick={() => checkPosition(el.userId)}>위치 확인</PosBox>
                    <ATBox>{el.overtime}</ATBox>
                  </Li>
                )
              })
            }
          </List2>
        </Contents3>
      </Container>
    </Background>
  )
}

const Background = styled.div`
  width: 100%;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6d98cf;
  border: solid black 1px;
`
const Container = styled.div`
  width: 600px;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #f8ecd6;
  border: solid black 1px;
`
const Contents1 = styled.div`
  width: 500px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: solid black 1px;
`
const List1 = styled.div`
  position: relative;  
  width: 400px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid blue 1px;
`
const Title1 = styled.div`
  width: 400px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: solid black 1px; */
`
const Icon = styled.div`
  position: absolute;
  font-size: 12px;
  right: 0;
  width: 35px;
  height: 35px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: skyblue;
`
const Title3 = styled.div`
  width: 400px;
`
const Contents2 = styled.div`
  width: 500px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #eeeeee;
  background-color: black;
  border: solid red 1px;
`
const TimeBox = styled.div`
  width: 150px;
  height: 110px;
`
const IntBox = styled.div`
  height: 80px;
  font-size: 40px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`
const TextBox = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Contents3 = styled.div`
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: solid green 1px;
`
const Title2 = styled.div`
  width: 450px;
  height: 40px;
  padding: 5px; 
  display: flex;
  justify-content: right;
  align-items: center;
  border: solid black 1px;
`
const List2 = styled.div`
  width: 450px;
  height: 200px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid red 1px;
`
const Li = styled.div`
  width: 450px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  border: solid blue 1px;
`
const NameBox = styled.div`
  width: 200px;
  border-right: solid black 1px;
`
const PosBox = styled.div`
  width: 100px;
  margin: 0 5px;
  background-color: white;
  cursor: pointer;
  :hover {
    color: white;
    background-color: black;
  }
`
const ATBox = styled.div`
  width: 100px;
  margin: 0 5px;
  background-color: white;
`

const GroupBox = styled.div`
`
const Box = styled.div`
`
const GroupName = styled.div`
`




export default Group;