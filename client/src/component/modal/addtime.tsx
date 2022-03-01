import React, { useContext, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { SocketContext } from '../../context';

type AddTimeProps = {
  user: User,
  setTimeModal: React.Dispatch<React.SetStateAction<boolean>>
}
let timeoutIdH: NodeJS.Timeout;
let timeoutIdM: NodeJS.Timeout;
let timeoutIdS: NodeJS.Timeout;
const AddTime = ({user, setTimeModal}: AddTimeProps) => {
  const socket = useContext(SocketContext);
  const params = useParams();
  const hourArr = Array.from({length: 24}, (_, i) => i);
  const minuteArr = Array.from({length: 60}, (_, i) => i);
  const secondArr = Array.from({length: 60}, (_, i) => i);
  const refSecond = useRef<HTMLDivElement>(null);
  const refHour = useRef<HTMLDivElement>(null);
  const refMinute = useRef<HTMLDivElement>(null);
  const [second, setSecond] = useState<string>('0');
  const [hour, setHour] = useState<string>('0');
  const [minute, setMinute] = useState<string>('0');
  
  
  const handleHour = () => {
    const x = Math.round((refHour.current?.scrollTop||0) / 50);
    setHour(x.toString());
    clearTimeout(timeoutIdH);
    timeoutIdH = setTimeout(() => {
      if (refHour.current && refHour.current.scrollTop !== x * 50) {
        refHour.current.scrollTop = x * 50;
      }
    }, 100)
  }
  
  const handleMinute = () => {
    const x = Math.round((refMinute.current?.scrollTop||0)/ 50);
    setMinute(x.toString());
    clearTimeout(timeoutIdM);
    timeoutIdM = setTimeout(() => {
      if (refMinute.current && refMinute.current.scrollTop !== x * 50) {
        refMinute.current.scrollTop = x * 50;
      }
    }, 100)
  }
  
  const handleSecond = () => {
    const x = Math.round((refSecond.current?.scrollTop||0)/ 50);
    setSecond(x.toString());
    clearTimeout(timeoutIdS);
    timeoutIdS = setTimeout(() => {
      if (refSecond.current && refSecond.current.scrollTop !== x * 50) {
        refSecond.current.scrollTop = x * 50;
      }
    }, 100)
  }

  const clickBack = () => {
    setTimeModal(false);
  }

  const clickComplete = () => {
    const time = `${hour}:${minute}:${second}`
    socket.emit("overtime", `${params.id}`, user.userId, time);
    setTimeModal(false);
  }

  return (
    <Backdrop onClick={clickBack}>
      <View onClick={e => e.stopPropagation()}>
        <Title>약속 시간 보다 늦을 것 같은 시간을 입력하세요</Title>
        <div>
        <TableName>
          <div>hour</div>
          <div>minute</div>
          <div>second</div>
        </TableName>
        <TimeBox>
          <MeridiumBox ref={refHour} onScroll={handleHour}>
            <MeridiumContainer>
              <Option select=''></Option>
              {
                hourArr.map((h, idx) => {
                  return (
                    idx > 9
                    ? <Option key={idx} id={`${h}`} select={`${Number(hour)}`} >{h}</Option>
                    : <Option key={idx} id={`${h}`} select={`${Number(hour)}`} >0{h}</Option>
                  )
                })
              }
              <Option select=''></Option>
            </MeridiumContainer>
          </MeridiumBox>
          <div>:</div>
          <HourBox ref={refMinute} onScroll={handleMinute}>
            <HourContainer>
              <Option select=''></Option>
                {
                  minuteArr.map((min, idx) => {
                    return (
                      idx > 9
                      ? <Option key={idx} id={`${min}`} select={`${minute}`}>{min}</Option>
                      : <Option key={idx} id={`${min}`} select={`${minute}`}>0{min}</Option>
                    )
                  })
                }
              <Option select=''></Option>
            </HourContainer>
          </HourBox>
          <div>:</div>
          <MinuteBox ref={refSecond} onScroll={handleSecond}>
            <MinuteContainer>
              <Option select=''></Option>
              {
               secondArr.map((sec, idx) => {
                  return (
                    idx > 9 
                      ? <Option key={idx} id={`${sec}`} select={`${second}`} >{sec}</Option>
                      : <Option key={idx} id={`${sec}`} select={`${second}`} >0{sec}</Option>
                  )
                })
              }
              <Option select=''></Option>
            </MinuteContainer>
          </MinuteBox>
          {/* <Select /> */}
        </TimeBox>
        <ButtonBox>
          <Button onClick={clickBack}>취소</Button>
          <Button onClick={clickComplete}>시간 추가</Button>
        </ButtonBox>
        </div>
      </View>
    </Backdrop>
  )
}

export default AddTime;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
  display:flex;
  justify-content:center;
  align-items:center;
`
const View = styled.div`
  position: fixed;
  z-index: 11;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 15px;
  background-color: #eeeeee;
`
const Title = styled.div`
  font-size:20px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
`
const TableName = styled.div`
  width: 250px;
  height: 40px;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: solid black 1px;
  div {
    width: 50px;
  }
`
const TimeBox = styled.div`
  width: 250px;
  height: 200px;
  position: relative;
  display:flex;
  justify-content:space-evenly;
  align-items: center;
  border-top: solid black 1px;
  border-bottom: solid black 2px;
  /* border: solid blue 1px; */
`
const MeridiumBox = styled.div`
  width: 80px;
  height: 150px;
  overflow: scroll;
  /* border: solid black 1px; */
  &::-webkit-scrollbar {
    display:none;
  }
`
const MeridiumContainer = styled.div`
  
`
const HourBox = styled.div`
  width: 80px;
  height: 150px;
  overflow: scroll;
  /* border: solid black 1px; */
  &::-webkit-scrollbar {
    display:none;
  }
`
const HourContainer = styled.div`
  width: 78px;
  height: 600px;
`
const MinuteBox = styled.div`
  width: 80px;
  height: 150px;
  overflow: scroll;
  /* border: solid black 1px; */
  &::-webkit-scrollbar {
    display:none;
  }
`
const MinuteContainer = styled.div`
  
`
interface OptionI {
  select: string
}
const Option = styled.div<OptionI>`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  background-color: ${(props) => props.id===props.select ? 'rgba(52, 106, 255, 0.4)' : 'none'};
`
const ButtonBox = styled.div`
  width: 250px;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const Button = styled.div`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6868ff;
  :hover {
    transform: translate(-1px, -1px);
    box-shadow: 2px 2px black;
    background-color: #7a7afc;
    cursor: pointer;
  }
`