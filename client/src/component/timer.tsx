import React, { useRef, useState, useEffect } from 'react';
import '../App.tsx';
import styled from "styled-components";
import {useParams } from 'react-router-dom';
import url from '../url';
import axios from "axios";



function Timer () {

  const [boo, setBoo] = useState<boolean>(false);
  const title = useRef<HTMLParagraphElement>(null); 
  const[day,setDay] = useState<any>(0)
  const[seconds,setSeconds] = useState<any>(0)
  const [minutes,setMinutes] =useState<any> (0);
  const [isIncrease,setIsIncrease] = useState(false);
  
  const [hours,setHours] = useState<any>(0);
  // Math.floor((1 % (1000*60*60*24))/(1000*60*60));
  const [groupTime, setGroupTime] = useState<Array<any>>([]);
  const params= useParams();
  console.log(day, seconds, minutes, hours)
  // setDate = new Date(time);
  // 131669123





  const getGroupTime = async () => {
    const res = await axios.get(`${url}/group/list`,{withCredentials:true});
    const filtered = res.data.groups.filter((el:any)=>{
      return el.id === Number(params.id);    
    });    
    // setGroupTime([...filtered]);
    // console.log(filtered)
    // setTime(groupTime[0]?._group.time)
    // console.log((time))
      let setDate = new Date(filtered[0]?._group.time);
      const now = new Date();
      console.log((setDate))
      console.log(groupTime[0]?._group.time)
          console.log((now))
      // setDistance(setDate.getTime() - now.getTime())
    // console.log(groupTime[0]._group.time)
    // 2022-02-28T18:00:00.000Z
    setBoo(true)
    setDay(Math.floor((setDate.getTime() - now.getTime())/(1000*60*60*24)))
    setMinutes(Math.floor(((setDate.getTime() - now.getTime()) % (1000*60*60))/(1000*60)))
    setSeconds(Math.floor((setDate.getTime() - now.getTime())%(1000*60)/(1000)))
  }


  // getGroupTime()


  function minusOne (){
    if(seconds ===0){
      setSeconds(59)
      // setMinutes(minutes-1)
    }
    else {
      setSeconds(seconds-1)    
    }
    // console.log('test')
  }


  const getDDay = () => {

  //   const setDateYear = setDate.getFullYear();
  // const setDateMonth = setDate.getMonth() + 1;
  // const setDateDay = setDate.getDate();
  // if(title.current){
  //   title.current.innerText = 
  //   `${setDateYear}년 ${setDateMonth}월 ${setDateDay}일까지 
  //     ${day}일 
  //     ${hours < 10 ? `0${hours}` : hours}시간 
  //     ${minutes < 10 ? `0${minutes}` : minutes}분 
  //     ${seconds < 10 ? `0${seconds}` : seconds}초 남았습니다.`;
  //   }
  }
// const init = () => {

//   // init 함수 생성해서 getDDay함수 호출하고,
//   getDDay();
//   setTimeout(minusOne, 1000);
//   }
  useEffect(() => {
    if(boo){
      setTimeout(minusOne, 1000);
    }
  }, [seconds]);

  useEffect(() => {
    getGroupTime()
  }, []);


  return(
    <>
  <Contents2>
    <TimeBox>
      <IntBox>{day}</IntBox>
      <TextBox>일</TextBox>
    </TimeBox>
    <TimeBox>
      <IntBox>{hours}</IntBox>
      <TextBox>시간</TextBox>
    </TimeBox>
    <TimeBox>
      <IntBox>{minutes}</IntBox>
      <TextBox>분</TextBox>
    </TimeBox>
    <TimeBox>
      <IntBox>{seconds}</IntBox>
      <TextBox>초</TextBox>
    </TimeBox>
  </Contents2>
    </>
  )
  
}

const Title = styled.div`
  background-color: #ffcdd2;
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

export default Timer;