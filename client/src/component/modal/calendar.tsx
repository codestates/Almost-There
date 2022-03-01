import React, { useRef, useState } from 'react';
import styled from 'styled-components'

interface Show {
  calendar: boolean,
  location: boolean,
  invite: boolean
}
interface Time {
  year: number,
  month: number,
  day: number,
  meridium: string,
  hour: number,
  minute: number
}

type CalendarProps = {
  setModal: React.Dispatch<React.SetStateAction<Show>>,
  time: Time,
  setTime: React.Dispatch<React.SetStateAction<Time>>
}
let meId: NodeJS.Timeout;
let hourId: NodeJS.Timeout;
let minId: NodeJS.Timeout;

const Calendar = ({ setModal, time, setTime }:CalendarProps) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const today = new Date().getDate();
  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const monthLength2 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const lastDay = year%4 === 0 ? monthLength2[month - 1] : monthLength[month - 1];
  const dayArr = Array.from({length: lastDay}, (_, i) => i+1);
  const emptyDay1 = Array(new Date(`${month} 1, ${year}`).getDay()).fill(0);
  const emptyDay2 = Array(42-emptyDay1.length-lastDay).fill(0);
  const meridiumArr = ['오전', '오후'];
  const hourArr = Array.from({length: 12}, (_, i) => i+1);
  const minuteArr = Array.from({length: 60}, (_, i) => i);
  const refMeridium = useRef<HTMLDivElement>(null);
  const refHour = useRef<HTMLDivElement>(null);
  const refMinute = useRef<HTMLDivElement>(null);
  const [day, setDay] = useState<string>(`${today}`);
  const [meridium, setMeridium] = useState<string>('오전');
  const [hour, setHour] = useState<string>('1');
  const [minute, setMinute] = useState<string>('0');

  const handleDay = (day:number) => {
    setDay(day.toString());
  }

  const handleMonth = (dir: string) => {
    switch (dir) {
      case 'left' :
        if (month === 1) {
          setYear(year - 1);
          setMonth(12);
        } else {
          setMonth(month-1);
        }
        break;
      case 'right' :
        if (month === 12) {
          setYear(year + 1);
          setMonth(1);
        } else {
          setMonth(month+1);
        }
        break;
      default :
        break;
    }
  }
  
  const handleMeridium = () => {
    const x = Math.round((refMeridium.current?.scrollTop||0)/ 50) + 1;
    switch (x) {
      case 1 :
        setMeridium('오전');
        break; 
      case 2 :
        setMeridium('오후');
        break;
      default:
        break;
    }
    clearTimeout(meId);
    meId= setTimeout(() => {
      if (refMeridium.current && refMeridium.current.scrollTop !== (x-1) * 50) {
        refMeridium.current.scrollTop = (x-1) * 50;
      }
    }, 100)
  }

  const handleHour = () => {
    const x = Math.round((refHour.current?.scrollTop||0) / 50) + 1;
    setHour(x.toString());
    clearTimeout(hourId);
    hourId= setTimeout(() => {
      if (refHour.current && refHour.current.scrollTop !== (x-1) * 50) {
        refHour.current.scrollTop = (x-1) * 50;
      }
    }, 100)
  }
  
  const handleMinute = () => {
    const x = Math.round((refMinute.current?.scrollTop||0)/ 50);
    setMinute(x.toString());
    clearTimeout(minId);
    minId = setTimeout(() => {
      if (refMinute.current && refMinute.current.scrollTop !== x * 50) {
        refMinute.current.scrollTop = x * 50;
      }
    }, 100)
  }

  const clickBack = () => {
    setModal({
      calendar: false,
      location: false,
      invite: false
    })
  }

  const selectComplete = () => {
    setTime({
      year: year,
      month: month,
      day: Number(day),
      meridium: meridium,
      hour: Number(hour),
      minute: Number(minute)
    })
    setModal({
      calendar: false,
      location: false,
      invite: false
    })
  }

  return (
    <Backdrop onClick={clickBack}>
      <View onClick={e => e.stopPropagation()}>
        <Title>약속 시간을 선택하세요</Title>
        <Contents>
          <MonthBox>
            <MonthSelectBox>
              <button onClick={() => handleMonth('left')}>&laquo;</button>
              <div>
                {year}년 {month}월
              </div>
              <button onClick={() => handleMonth('right')}>&raquo;</button>
            </MonthSelectBox>
            <WeekBox>
              {
                week.map((day, idx) => {
                  return (
                    <Week key={idx}>{day}</Week>
                  )
                })
              }
            </WeekBox>
            <DayBox>
              {emptyDay1.map((_, idx) => {
                return (
                  <Day key={idx} select=""></Day>
                )
              })}
              {dayArr.map((d, idx) => {
                return (
                <Day key={idx} onClick={() => handleDay(d)} select={day} id={`${d}`}>{d}</Day>
                );
              })}
              {emptyDay2.map((_, idx) => {
                return (
                  <Day key={idx} select=""></Day>
                )
              })}
            </DayBox>
          </MonthBox>
          <TimeBox>
            <MeridiumBox ref={refMeridium} onScroll={handleMeridium}>
              <MeridiumContainer>
                <Option select=''></Option>
                {
                  meridiumArr.map((item, idx) => {
                    return (
                      <Option key={idx} id={`${item}`} select={`${meridium}`} >{item}</Option>
                    )
                  })
                }
                <Option select=''></Option>
              </MeridiumContainer>
            </MeridiumBox>
            <HourBox ref={refHour} onScroll={handleHour}>
              <HourContainer>
                <Option select=''></Option>
                  {
                    hourArr.map((h, idx) => {
                      return (
                        <Option key={idx} id={`${h}`} select={`${hour}`}>{h}</Option>
                      )
                    })
                  }
                <Option select=''></Option>
              </HourContainer>
            </HourBox>
            <MinuteBox ref={refMinute} onScroll={handleMinute}>
              <MinuteContainer>
                <Option select=''></Option>
                {
                  minuteArr.map((min, idx) => {
                    return (
                      idx > 9 
                        ? <Option key={idx} id={`${min}`} select={`${minute}`} >{min}</Option>
                        : <Option key={idx} id={`${min}`} select={`${minute}`} >0{min}</Option>
                    )
                  })
                }
                <Option select=''></Option>
              </MinuteContainer>
            </MinuteBox>
            <Select />
          </TimeBox>
        </Contents>
        <div>
          <button onClick={selectComplete}>선택 완료</button>
        </div>
      </View>
    </Backdrop>
  )
}

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
  width: 600px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #eeeeee;
`
const Title = styled.div`
  font-size:20px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
`
const Contents = styled.div`
  height: 350px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const MonthBox = styled.div`
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`
const MonthSelectBox = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const WeekBox = styled.div`
  width: 300px;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const Week = styled.div`
  width: 40px;
`
const DayBox =styled.div`
  width: 300px;
  height: 280px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`
interface DayI {
  select: string
}
const Day = styled.div<DayI>`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => props.id===props.select ? 'green' : 'none'};
  :hover {
    background-color: wheat;
    cursor: pointer;
  }
`
const TimeBox = styled.div`
  width: 250px;
  height: 250px;
  position: relative;
  display:flex;
  justify-content:space-evenly;
  align-items: center;
  border: solid blue 1px;
`
const MeridiumBox = styled.div`
  width: 80px;
  height: 150px;
  overflow: scroll;
  border: solid black 1px;
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
  border: solid black 1px;
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
  border: solid black 1px;
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
const Select = styled.div`
  width: 250px;
  height: 50px;
  position: absolute;
  top: 100px;
  left: 0px;
  border-top: solid red 1px;
  border-bottom: solid red 1px;
  z-index:-1;
`
export default Calendar