import styled from 'styled-components';
import { Timer } from '../component';
import React from 'react';
import '../App.css';
import { useState, useCallback,useEffect } from "react";
import url from '../url';
import axios from "axios";
import { useParams } from 'react-router-dom';


function Group () {
  const [groupInfo, setGroupInfo] = useState<Array<any>>([ ])
  // const [groupInfo, setGroupInfo] = useState<Object>([ ])
  const [newInfo, setnewInfo] = useState<Object>([ ])
  const params= useParams();

useEffect(() => {      
getGroupInfo();
// console.log(groupInfo[0])
},[]);  

const getGroupInfo = () => {
  // console.log('test')
  axios
  .get(
  `${url}/group/list`,
  {withCredentials:true}
  )
  .then((res) => {
  const filtered = res.data.groups.filter((el:any)=>{
  // filter 사용하여 id가 00인 그룹정보 불러오기
  // return el.groupId === 3
  // console.log(params.id)
  // return el.id === 5;    
  return el.id === Number(params.id);    

})
  // console.log(res.data.groups[0]._group.name)
  // console.log(filtered)  
  // console.log(res.data.groups)
  // setGroupInfo([...filtered])    
  setGroupInfo([...filtered])    
  setnewInfo(groupInfo)

  // console.log(filtered)  
  // console.log(groupInfo)
  // console.log(newInfo)  

})
  .catch((err) => {
  });
}

//groups의 name, place, time 필요


  return (
    <Background>
      <Container>
        <Contents1>
          <List1>
          {/* <GroupBox>
          {groupInfo.map((el)=>{
          return (
          <Box>
          <GroupName 
          // key={el.id}
          >
          {el.name}
          </GroupName>
          </Box>
          )
          })}
          </GroupBox>  
 */}
            <Title1 onClick={getGroupInfo} >{groupInfo[0]?._group.name}</Title1>
            <Icon>
              그룹원
            </Icon>
          </List1>
          <List1>
            <Title1>{groupInfo[0]?._group.place}</Title1>
            <Icon>지도</Icon>
          </List1>
          <List1>
            <Title3>{groupInfo[0]?._group.time}</Title3>
          </List1>
        </Contents1>
        <Timer />
        <Contents3>
          <Title2><button>시간 추가</button></Title2>
          <List2>
            <Li>
              <NameBox>멤버1</NameBox>
              <PosBox>위치 확인</PosBox>
              <ATBox>17:10</ATBox>
            </Li>
            <Li>
              <NameBox>멤버2</NameBox>
              <PosBox>위치 확인</PosBox>
              <ATBox>17:15</ATBox>
            </Li>
            <Li>
              <NameBox>멤버3</NameBox>
              <PosBox>위치 확인</PosBox>
              <ATBox>17:17</ATBox>
            </Li>
            <Li>
              <NameBox>멤버4</NameBox>
              <PosBox>위치 확인</PosBox>
              <ATBox>17:05</ATBox>
            </Li>
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
  justify-content: space-evenly;
  align-items: center;
  border: solid red 1px;
`
const Li = styled.div`
  width: 450px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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