import styled from 'styled-components';
import { AddTime, Timer } from '../component';
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
  overtime: string,
  arrive: string
}

type GroupProps = {
  user: User
}

function Group ({ user }: GroupProps) {
  const [timeModal, setTimeModal] = useState(false);
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
    // arrive : "true", "false", "leave"
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
    const time = `${Number(date[1])}월 ${Number(date[2])}일  ${ampm} ${date[3]}시 ${date[4]}분`;
    setGroupInfo({name, place, time, leaderId, x, y});
    const mapping = res.data.member.map((el:any) => {
      return { userId: el.userId, overtime: el.overtime, arrive: "false"}
    })
    // setMember([...res.data.member]);
    setMember([...mapping])
  }
  const clickMap = () => {
    navigate(`/map/${params.id}`);
  }

  const checkPosition = (userId: string) => {
    navigate(`/map/${params.id}/${userId}`);
  }

  const addTime = () => {
    setTimeModal(true);
  }

  useEffect(() => {     
    getGroupInfo();
    socket.on("arrive", (groupId, userId, arrive) => {
      if (groupId === params.id) {
        const update = member.map((el) => {
          if (userId === el.userId) {
            return {
              overtime: el.overtime,
              userId: el.userId,
              arrive: arrive
            }
          } else {
            return el
          }
        })
        setMember([...update]);
      }
    })
    socket.on("overtime", (groupId, userId, overtime) => {
      if (groupId === params.id) {
        const update = member.map((el) => {
          if (userId === el.userId) {
            return {
              overtime: overtime,
              userId: el.userId,
              arrive: el.arrive
            }
          }
        })
      }
    })
    // group1, group2, group3
    // 도착 완료 - client에서 장소가 바뀔 떄 마다 x,y, userId
    // userId가 포함된 그룹들 res = await (users_groups 와 _groups를 조인한 테이블) where userId;
    // const filter = res.filter((el) => {
    //   let a = new Date(el.time).getTime();
    //   let b = new Date().getTime();
    //   return Number(Math.floor(a-b/1000*60)) < 10
    // })
    // console.log(filter);
    // filter.forEach((el) => { //x 127.1234 , y 37.1234
    //   if ( (Math.floor(el.x*100)/100) === (Math.floor(data.x*100)/100) 
    // && (Math.floor(el.y*100)/100) === (Math.floor(data.y*100)/100)) {
    // db => 도착완료로 바꾸고
    // io.to(`group ${el.groupId}`).emit("groupInfo", (a, b, c))  
    // }
    //
    // }) 
    // 도착 완료, 시간 추가
    // -- --
    // socket.on("groupinfo", () => {
    /*
      socket.on("Enter Group", (GroupId) => {
        socket.join(`Group ${GroupId}`);
      })
      socket.on("time", () => {
        io.to(`Group ${GroupId}`).emit(data);
      })
      socket.on("arrive", () => {
        io.to(`Group ${GroupId}`).emit(data);
      })
     */
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
      {timeModal
        ? <AddTime user={user} setTimeModal={setTimeModal}/>
        : <></>
      }
      <Container>
        <Contents1>
            <Title1 onClick={getGroupInfo} >{groupInfo?.name}</Title1>
          {/* <List1>
          </List1> */}
          <List1>
            <Title3>{groupInfo?.place}</Title3>
            <Icon onClick={clickMap}><i className="fa-solid fa-earth-asia" ></i></Icon>
          </List1>
          <List1>
            <Title3>{groupInfo?.time}</Title3>
          </List1>
        </Contents1>
        <Timer />
        <Contents3>
          {/* <Title2 onClick={addTime}><button>도착 예정 시간</button></Title2> */}
          <TableBox>
            <ArriveBox>
              도착<div className="arrive"></div>
              가는 중<div className="yet"></div>
              불참<div className="leave"></div>
            </ArriveBox>
            <PositionBox>위치 확인</PositionBox>
            <OvertimeBox>추가 시간</OvertimeBox>
          </TableBox>
          <List2>
            {
              member.map((el) => {
                return (
                  <Li key={el.userId}>
                    <NameBox className={el.arrive}>{el.userId}
                    </NameBox>
                    {checkloc
                      ? <PosBox className='on' onClick={() => checkPosition(el.userId)}>
                          <i className="fa-solid fa-earth-asia" ></i>
                        </PosBox>
                      : <PosBox className='off'>
                          <i className="fa-solid fa-hourglass"></i>
                        </PosBox>
                    }
                    {el.userId === user.userId 
                      ? <ATBox className="add" onClick={addTime}>+{el.overtime}</ATBox>
                      : <ATBox>+{el.overtime}</ATBox>
                    }
                  </Li>
                )
              })
            }
          </List2>
        </Contents3>
      </Container>
      <Leave>
        <div>out</div>
        {/* <i className="fa-solid fa-right-from-bracket"></i> */}
      </Leave>
      <Goback>
        <div>mypage</div>
        {/* <i className="fa-solid fa-right-from-bracket"></i> */}
      </Goback>
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
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: solid black 1px;
`
const List1 = styled.div`
  position: relative;  
  width: 400px;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: solid blue 1px; */
`
const Title1 = styled.div`
  width: 400px;
  height: 40px;
  font-size: 30px;
  letter-spacing: 5px;
  word-spacing: 10px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: solid black 1px; */
`
const Icon = styled.span`
  /* position: absolute; */
  font-size: 20px;
  /* right: 0; */
  width: 30px;
  height: 30px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: skyblue;
  :hover {
    cursor: zoom-in;
  }
`
const Title3 = styled.div`
  width: 400px;
`
const Contents3 = styled.div`
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid green 1px;
`
const TableBox = styled.div`
  width: 450px;
  height: 40px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #005ecb;
  color: white;
  border: solid 1px black;
`
const ArriveBox = styled.div`
  width: 200px;
  height: 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 5px;
  div {
    margin: 0 10px 0 0;
    &.arrive {
      width: 10px;
      height: 10px;
      background-color: #21b965;
    }
    &.yet {
      width: 10px;
      height: 10px;
      background-color: #ffd600;
    }
    &.leave{
      width: 10px;
      height: 10px;
      margin: 0px;
      background-color: #d50000;
    }
  }
`
const PositionBox = styled.div`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
`
const OvertimeBox = styled.div`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
`
const List2 = styled.div`
  width: 450px;
  height: 300px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #83b9ff;
  border: solid red 1px;
`
const Li = styled.div`
  width: 450px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  border: solid blue 1px;
`
const NameBox = styled.div`
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  border-radius: 5px;
  &.true {
    background-color: #21b965;
  }
  &.false {
    background-color: #ffd600;
  }
  &.leave {
    color: white;
    background-color: #d50000;
  }
`
const PosBox = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  background-color: #448aff;
  border-radius: 5px;
  &.on {
    :hover {
      cursor: pointer;
      color: white;
      background-color: black;
    }
  } 
  &.off {
    :hover {
      cursor: not-allowed;
    }
  }
`
const ATBox = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  background-color: #448aff;
  border-radius: 5px;
  :hover {
    cursor: default;
  }
  &.add {
    :hover {
      background-color: black;
      color: white;
      cursor: pointer;
    }
  }
`
const Leave = styled.div`
  width : 80px;
  height: 40px;
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 20px;  
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #448aff;
  border-radius: 10px;
  :hover {
    cursor: pointer;
  }
`
const Goback = styled.div`
  width : 80px;
  height: 40px;
  position: fixed;
  bottom: 10px;
  left: 10px;
  font-size: 20px;  
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #448aff;
  border-radius: 10px;
  :hover {
    cursor: pointer;
  }
`

const GroupBox = styled.div`
`
const Box = styled.div`
`
const GroupName = styled.div`
`




export default Group;