import { useState, useEffect } from 'react';
import '../App.tsx';
import styled from "styled-components";
import {useParams } from 'react-router-dom';
import url from '../url';
import axios from "axios";



function Timer () {

  const [boo, setBoo] = useState<boolean>(false);
  const[day,setDay] = useState<any>(0)
  const[seconds,setSeconds] = useState<any>(0)
  const [minutes,setMinutes] =useState<any> (0);
  const [hours,setHours] = useState<any>(0);
  // Math.floor((1 % (1000*60*60*24))/(1000*60*60));
  const [groupTime, setGroupTime] = useState<Array<any>>([]);
  const params= useParams();

  const getGroupTime = async () => {
    const res = await axios.get(`${url}/group/list`,{withCredentials:true});
    const filtered = res.data.groups.filter((el:any)=>{
      return el.groupId === Number(params.id);    
    });
    console.log(filtered[0]?._group.time);
    let setDate = new Date(filtered[0]?._group.time);

    const now = new Date();
    setBoo(true)
    setDay(Math.floor((setDate.getTime() - now.getTime())/(1000*60*60*24)))
    setHours(Math.floor(((setDate.getTime() - now.getTime()) % (1000*60*60*24))/(1000*60*60))) ;
    setMinutes(Math.floor(((setDate.getTime() - now.getTime()) % (1000*60*60))/(1000*60)))
    setSeconds(Math.floor((setDate.getTime() - now.getTime())%(1000*60)/(1000)))
    console.log(setDate.getTime()-now.getTime())
    // console.log()
    
  }

  function minusOne (){
    if(seconds ===0){
      setSeconds(59)
      if( minutes===0){
        setMinutes(59)
        if(hours===0){
          setHours(23)
          setDay(day-1)
          if(day===0){
            setDay(0)
            setHours(0)
            setMinutes(0)
            setSeconds(0)
          }
        }
        else{
          setHours(hours-1)
        }
      }
      else {
        setMinutes(minutes-1)
      }
      // setMinutes(minutes-1)
    }
    else {
      setSeconds(seconds-1)    
    }
    // console.log('test')
  }

  useEffect(() => {
    if(boo){

      let ID = setTimeout(minusOne, 1000);
      if(day<=0 && hours <= 0 && minutes <=0 && seconds<=0 ){
        setDay(0)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
        setBoo(false)
        clearTimeout(ID)
    }        
      return () => clearTimeout(ID)      
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