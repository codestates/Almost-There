import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MsgModal, Timerd } from '../component';
import AddTimed from '../component/modal/addtimed';
import '@fortawesome/fontawesome-free/js/all'

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
  arrive: string,
  name: string
}

const Exp2 = () => {
  const [timeModal, setTimeModal] = useState(false);
  const [groupInfo, setGroupInfo] = useState<GroupInfo>({
    name: '그룹 체험',
    place: '서울역',
    time: new Date().toString(),
    leaderId: 'me',
    x: '126.9706',
    y: '37.5546'
  });
  const [member, setMember] = useState<Array<Member>>([
    {
      userId: 'me',
      name: '사용자',
      overtime: '00:00:00',
      arrive: 'false'
    },
    {
      userId: 'dummy1',
      name: '김코딩',
      overtime: '00:00:00',
      arrive: 'true'
    },
    {
      userId: 'dummy2',
      name: '박해커',
      overtime: '00:05:00',
      arrive: 'leave'
    },
    {
      userId: 'dummy3',
      name: '이데브',
      overtime: '00:00:00',
      arrive: 'false'
    }
  ]);
  const [showMsg, setShowMsg] = useState(false);
  const [checkloc, setCheckloc] = useState<boolean>(false);
  const navigate = useNavigate();

  const clickMap = () => {
    navigate('/mapd')
  }

  const checkPosition = (userId: string) => {
    setShowMsg(true);
  }

  const addTime = () => {
    setTimeModal(true);
  }

  const handleComplete = () => {
    navigate('/exp3')
  }

  useEffect(() => {
    let id = setTimeout(() => {
      setCheckloc(true);
    }, 30000)
    return () => clearTimeout(id);
  }, []);

  return (
    <Background>
      {timeModal
        ? <AddTimed setTimeModal={setTimeModal} member={member} setMember={setMember}/>
        : <></>
      }
      {showMsg
        ? <MsgModal setView={setShowMsg} msg={'체험하기에서 사용할 수 없는 기능입니다.'} />
        : <></>
      }
      <CompleteButton onClick={handleComplete}>모두 도착 완료</CompleteButton>
      <Container>
        <Contents1>
            <Title1>{groupInfo?.name}</Title1>
          {/* <List1>
          </List1> */}
          <List1>
            <Title3>
              {groupInfo?.place}
              <Icon onClick={clickMap}><i className="fa-solid fa-earth-asia" ></i></Icon>
            </Title3>
          </List1>
          <List1>
            <Title3>{groupInfo?.time}</Title3>
          </List1>
        </Contents1>
        <Contents3>
          {/* <Title2 onClick={addTime}><button>도착 예정 시간</button></Title2> */}
          <TableBox>
            <ArriveBox>
              도착<div className="true"></div>
              {/* 가는 중<div className="yet"></div> */}
              불참<div className="leave"></div>
            </ArriveBox>
            <PositionBox>위치 확인</PositionBox>
            <OvertimeBox>초과 시간</OvertimeBox>
          </TableBox>
          <List2>
            {
              member.map((el) => {
                return (
                  <Li key={el.userId}>
                    <NameBox className={el.arrive}>{el.name}
                    </NameBox>
                    {checkloc
                      ? <PosBox className='on' onClick={() => checkPosition(el.userId)}>
                          <i className="fa-solid fa-earth-asia" ></i>
                        </PosBox>
                      : <PosBox className='off' onClick={() => setShowMsg(true)}>
                          <i className="fa-solid fa-earth-asia"></i>
                        </PosBox>
                    }
                    {el.userId === 'me'
                      ? <ATBox className="add" onClick={addTime}>+{el.overtime}</ATBox>
                      : <ATBox>+{el.overtime}</ATBox>
                    }
                  </Li>
                )
              })
            }
          </List2>
        </Contents3>
        <Timerd />
      </Container>
      {/* <Leave onClick={leaveGroup}>
        <div>그룹 나가기</div>
      </Leave>
      <MyPage onClick={() => navigate('/mypage')}>
        <div>마이페이지</div>
      </MyPage> */}
    </Background>
  )
}

const Background = styled.div`
  width: 100%;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  /* border: solid black 1px; */
  @media screen and (max-height: 650px) {
    align-items: start;
  }
`
const Container = styled.div`
  width: 600px;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #eeeeee;
  border: solid black 1px;
  @media screen and (max-width: 600px) {
    width: 400px;
    height: 93vh;
  }
`
const Contents1 = styled.div`
  width: 500px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  /* border: solid black 1px; */
  @media screen and (max-width: 600px) {
    width: 400px;
  }
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
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid black 1px;
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
  /* background-color: skyblue; */
  :hover {
    cursor: zoom-in;
  }
`
const Title3 = styled.div`
  width: 400px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Contents3 = styled.div`
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: solid green 1px; */
  @media screen and (max-width: 600px) {
    width: 380px;
  }
`
const TableBox = styled.div`
  width: 500px;
  height: 40px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #aaaaaa;
  color: black;
  border: solid 1px black;
  @media screen and (max-width: 600px) {
    width: 380px;
  }
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
    &.true {
      width: 10px;
      height: 10px;
      background-color: #b9f6ca;
    }
    &.leave{
      width: 10px;
      height: 10px;
      margin: 0px;
      background-color: #ff8a80;
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
  width: 500px;
  height: 300px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  /* border: solid red 1px; */
  @media screen and (max-width: 600px) {
    width: 380px;
  }
`
const Li = styled.div`
  width: 500px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  border-bottom: solid black 1px;
  @media screen and (max-width: 600px) {
    width: 380px;
  }
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
    background-color: #b9f6ca;
  }
  &.leave {
    color: white;
    background-color: #ff8a80;
  }
`
const PosBox = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  background-color: #eeeeee;
  color: black;
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
  background-color: #eeeeee;
  color: black;
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
const CompleteButton = styled.div`
  position: fixed;
  top: 8vh;
  right: 1vw;
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  border-radius: 20px;
  background-color: #aaaaaa;
  :hover {
    background-color: black;
    color: white;
    cursor: pointer;
  }
`


export default Exp2;