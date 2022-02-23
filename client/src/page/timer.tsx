import React, { useRef, useState, useEffect } from 'react';
import '../App.tsx';

import styled from "styled-components";

// const refHour = useRef<HTMLDivElement>(null);
// <HourBox ref={refHour} />


function Timer () {

  // refHour.current
  // const title = document.querySelector("div") as HTMLParagraphElement; 
  const title = useRef<HTMLParagraphElement>(null); 

  // const title = document.querySelector("div");
  const setDate = new Date("2023-01-01T00:00:00+0900");

  const now = new Date();

  // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다. 
  const distance = setDate.getTime() - now.getTime();
  
  // Math.floor 함수를 이용해서 근접한 정수값을 가져온다.
  // 밀리초 값이기 때문에 1000을 곱한다. 
  // 1000*60 => 60초(1분)*60 => 60분(1시간)*24 = 24시간(하루)
  // 나머지 연산자(%)를 이용해서 시/분/초를 구한다.


  // const[day,setDay] = useState<number>(0)
  const[day,setDay] = useState<any>(Math.floor(distance/(1000*60*60*24)))
  const[seconds,setSeconds] = useState<any>(Math.floor(distance%(1000*60)/(1000)))
  const [minutes,setMinutes] =useState<any> (Math.floor((distance % (1000*60*60))/(1000*60)));


  const [isIncrease,setIsIncrease] = useState(false);

  useEffect(() => {
    init()
    // if(!isIncrease) return undefined;
    
  }, [seconds]);


  const Day = Math.floor(distance/(1000*60*60*24));
  const hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
  // const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
  // const seconds = Math.floor((distance % (1000*60))/1000);

  function minusOne (){
    setSeconds(seconds-1)
    if(seconds ===0){
      setSeconds(59)
      setMinutes(minutes-1)
    }
    console.log('test')
  }


  const getDDay = () => {
  // D-Day 날짜 지정
  // const setDate = new Date("2023-01-01T00:00:00+0900");
  // D-day 날짜의 연,월,일 구하기
  const setDateYear = setDate.getFullYear();
  // getMonth 메서드는 0부터 세기 때문에 +1 해준다.
  const setDateMonth = setDate.getMonth() + 1;
  const setDateDay = setDate.getDate();
  
  // D-Day 날짜를 가져오고,
  // 삼항 연산자를 사용해서 값이 10보다 작을 경우에 대해 조건부 렌더링을 해준다.
  if(title.current){
    title.current.innerText = 
    `${setDateYear}년 ${setDateMonth}월 ${setDateDay}일까지 
      ${day}일 
      ${hours < 10 ? `0${hours}` : hours}시간 
      ${minutes < 10 ? `0${minutes}` : minutes}분 
      ${seconds < 10 ? `0${seconds}` : seconds}초 남았습니다.`;
  }
      // title ? title.appendChild(div) : null;
      
    }
const init = () => {
  console.log('hello')
  // init 함수 생성해서 getDDay함수 호출하고,
  getDDay();
  // setInterval 메서드에서 getDDay함수를 1초(1000밀리초)마다 호출한다.
  // setInterval(getDDay, 1000);
  setTimeout(minusOne, 1000);
}

// init();

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

    {/* <Title ref={title} /> */}
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
