import styled from 'styled-components';
import { Timer } from '../component';
import React, { useRef } from 'react';
import '../App.css';
import { useState, useCallback,useEffect } from "react";
import url from '../url';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import '@fortawesome/fontawesome-free/js/all.js'
import { socket } from '../context';

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
  const timeleft = useRef({
    left: 30
  })
  const [checkloc, setCheckloc] = useState<boolean>(false);
  const navigate = useNavigate();
  const params= useParams();
  let date: Array<any>;
  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const monthLength2 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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
    const lastDay = Number(date[0])%4 === 0 ? monthLength2[Number(date[1]) - 1] : monthLength[Number(date[1]) - 1];
    timeleft.current.left = Math.floor((new Date(res.data.groupInfo.time).getTime() - new Date().getTime())/(1000*60));
    if (Math.floor((new Date(res.data.groupInfo.time).getTime() - new Date().getTime())/(1000*60)) < 10) {
      setCheckloc(true);
    }
    if (Number(date[3]) + 9 > 24) {
      if (Number(date[2]) === lastDay) {
        date[2] = 1;
        date[1] = Number(date[1]) + 1;
      } else {
        date[2] = Number(date[2]) + 1;
      }
    } 
    let ampm = '';
    date[3] = Number(date[3]);
    date[3] = date[3] + 9 > 24 ? date[3] + 9 - 24 : date[3] + 9
    if (date[3] > 12) {
      date[3] = date[3] - 12;
      ampm = '오후'
      if (date[3] < 10) {
        date[3] = '0' + date[3];
      }
      if (date[3] === 12) ampm = '오전'
    } else {
      if (date[3] === 12) {
        ampm = '오후'
      } else {
        if (date[3] < 10) {
          date[3] = '0' + date[3];
        }
        ampm = '오전'
      }
    }
    const time = `${Number(date[1])}월 ${Number(date[2])}일 - ${ampm} ${date[3]}시 ${date[4]}분`;
    setGroupInfo({name, place, time, leaderId, x, y});
    const mapping = res.data.member.map((el:any) => {
      let arr = el.overtime.split(':');
      arr[0] = Number(arr[0]) + Number(date[3].slice(3));
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
    // socket.on("groupinfo", () => {

    // })
    let id = setInterval(() => {
      if (timeleft.current.left < 10 ) {
        setCheckloc(true);
      }
      timeleft.current.left = timeleft.current.left - 1;
    }, 60000);
    return () => clearInterval(id)
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
                    {checkloc
                      ? <PosBox className='on' onClick={() => checkPosition(el.userId)}>
                          위치확인
                            <i className="fa-solid fa-earth-asia" ></i>
                        </PosBox>
                      : <PosBox className='off'>&times;</PosBox>
                    }
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
  &.on {
    :hover {
      cursor: pointer;
      color: white;
      background-color: black;
    }
  } 
  &.off {
    background-color: blue;
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