import React, { useRef, useState, useEffect } from 'react';
import '../App.tsx';
import styled from "styled-components";

function Timer () {

  const title = useRef<HTMLParagraphElement>(null); 
  const setDate = new Date("2023-01-01T00:00:00+0900");
  const now = new Date();
  const distance = setDate.getTime() - now.getTime();
  const[day,setDay] = useState<any>(Math.floor(distance/(1000*60*60*24)))
  const[seconds,setSeconds] = useState<any>(Math.floor(distance%(1000*60)/(1000)))
  const [minutes,setMinutes] =useState<any> (Math.floor((distance % (1000*60*60))/(1000*60)));
  const [isIncrease,setIsIncrease] = useState(false);
  const Day = Math.floor(distance/(1000*60*60*24));
  const hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));

  function minusOne (){
    setSeconds(seconds-1)
    if(seconds ===0){
      setSeconds(59)
      setMinutes(minutes-1)
    }
    // console.log('test')
  }


  const getDDay = () => {
  const setDateYear = setDate.getFullYear();
  const setDateMonth = setDate.getMonth() + 1;
  const setDateDay = setDate.getDate();
  if(title.current){
    title.current.innerText = 
    `${setDateYear}년 ${setDateMonth}월 ${setDateDay}일까지 
      ${day}일 
      ${hours < 10 ? `0${hours}` : hours}시간 
      ${minutes < 10 ? `0${minutes}` : minutes}분 
      ${seconds < 10 ? `0${seconds}` : seconds}초 남았습니다.`;
    }
  }
const init = () => {
  // console.log('hello')
  // init 함수 생성해서 getDDay함수 호출하고,
  getDDay();
  setTimeout(minusOne, 1000);
  }
  useEffect(() => {
  init()
  }, [seconds]);


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