import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Calendar, Invite, Location } from '../component/index'
import url from '../url';

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

function CreateGroup () {
  const [modal, setModal] = useState<Show>({
    calendar: false,
    location: false,
    invite: false
  })
  const [groupName, setGroupName] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);
  const refGroupName = useRef<HTMLInputElement>(null);
  const [time, setTime] = useState<Time>({
    year: 2022,
    month: 1,
    day: 1,
    meridium: '오후',
    hour: 12,
    minute: 0
  })
  const [inviteList, setInviteList] = useState<Array<string>>([]);
  const navigate = useNavigate();

  const handleGroupName = (boo:boolean) => {
    setEdit(boo);
  }

  const handleTime = () => {
    setModal({
      ...modal,
      calendar: true
    })
  }
  
  const handleLocation = () => {
    setModal({
      ...modal,
      location: true
    })
  }
  
  const handleInvite = () => {
    setModal({
      ...modal,
      invite: true
    })
  }

  const handleDelete = (idx: number) => {
    setInviteList([...inviteList.slice(0,idx), ...inviteList.slice(idx+1)])
  }

  const handleCreateButton = async () => {
    // const res = await axios.post(`${url}/group/create`, {
    //   name: groupName,
    //   time: `${time.day}`,
    //   place: '서울역 1번출구',
    //   inviteId: inviteList
    // });
    // const id = res.data.data.id;
    const id = 3;
    navigate(`/group/${id}`);
  }

  useEffect(() => {
    if (refGroupName) {
      refGroupName.current?.focus();
    }
  }, [edit])

  return (
    <>
    <Background>
      { 
        modal.calendar
          ? <Calendar setModal={setModal} time={time} setTime={setTime}/>
          : <></>
      }
      {
        modal.location
          ? <Location />
          : <></>
      }
      {
        modal.invite
          ? <Invite setModal={setModal} inviteList={inviteList} setInviteList={setInviteList}/>
          : <></>
      }
      <Container>
        <Title>Almost There 그룹 생성</Title>
        <Contents1>
          <Box1>
            <Box2>
              <Title2>그룹 이름</Title2>
              { !edit
                  ? <Box4>{groupName}</Box4>
                  : <Input4 value={groupName} ref={refGroupName}
                  onChange={e => setGroupName(e.target.value)} 
                  ></Input4>
              }
            </Box2>
            <Box3>
              <div>
                {!edit
                  ? <Button3 onClick={() => handleGroupName(true)}>그룹 이름 작성</Button3>
                  : <Button3 onClick={() => handleGroupName(false)}>작성 완료</Button3>
                }
              </div>
            </Box3>
          </Box1>
          <Box1>
            <Box2>
              <Title2>약속 시간</Title2>
              <Box4>{`${time.year}년 ${time.month}월 ${time.day}일 ${time.meridium}`}
                    {time.hour > 10 
                      ? ` ${time.hour}시`
                      : ` 0${time.hour}시`
                    }
                    {time.minute > 10
                      ? ` ${time.minute}분`
                      : ` 0${time.minute}분`
                    }
              </Box4>
            </Box2>
            <Box3>
              <div>
                <button onClick={handleTime}>약속 시간 선택</button>
              </div>
            </Box3>
          </Box1>
          <Box1>
            <Box2>
              <Title2>약속 장소</Title2>
              <Box4>xx역 1번 출구</Box4>
            </Box2>
            <Box3>
              <div>
                <button onClick={handleLocation}>약속 장소 선택</button>
              </div>
            </Box3>
          </Box1>
        </Contents1>
        <Contents2>
          <TitleBox>
            <Title3>초대 목록</Title3>
            <InviteBox><button onClick={handleInvite}>초대 하기</button></InviteBox>
          </TitleBox>
          <List>
            {inviteList.map((el, idx) => {
              return (
                <Li key={idx}>
                  <NameBox>{el}</NameBox>
                  <DropButton><button onClick={() => handleDelete(idx)}>&times;</button></DropButton>    
                </Li>
              )})
            }
          </List>
        </Contents2>
        <Contents3>
          <Button2 onClick={handleCreateButton}>그룹 생성 완료</Button2>
        </Contents3>
      </Container>
    </Background>
    </>
  )
}

const Background = styled.div`
  width: 100%;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #9ccc65;
  border: solid black 1px;
`
const Container = styled.div`
  width: 600px;
  height: 650px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #eeeeee;
  border: solid black 1px;
`
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 20px 0px;
  border: solid black 1px;
  `
const Title2 = styled.div`
  width: 200px;
  font-weight: bold;
  border-bottom: solid black 1px;
`
const Contents1 = styled.div`
  height : 200px;
  width: 550px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: solid black 1px;
`
const Contents2 = styled.div`
  width: 550px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: solid black 1px;
`
const Contents3 = styled.div`
  width: 550px;
  height: 50px;
  display: flex;
  justify-content: right;
  align-items: center;
  border: solid black 1px;
`
const Box1 = styled.div`
  width: 500px;
  height: 150px;  
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: solid red 1px;
`
const Box2 = styled.div`
  width: 250px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  /* border: solid green 1px; */
`
const Box3 = styled.div`
  width: 150px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: solid black 1px; */
`
const Box4 = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: solid black 1px; */
`
const Input4 = styled.input`
  height: 30px;
  text-align: center;
  background-color: rgba(52, 106, 255, 0.3);
  :focus {
    outline: none;
  }
`
const Button3 = styled.button`
  width: 107.43px;
  height: 24.4px;
`
const TitleBox = styled.div`
  width: 500px;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: solid blue 1px;
  `
const Title3 = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  /* border: solid black 1px; */
`
const InviteBox = styled.div`
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: solid black 1px; */
`
const List = styled.div`
  width: 500px;
  height: 300px;
  overflow: scroll;
  border: solid red 1px;
  ::-webkit-scrollbar {
    display: none;
  }
`
const Li = styled.div`
  width: 500px;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: solid green 1px;
`
const NameBox = styled.div`
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: solid black 1px; */
`
const DropButton = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: solid black 1px; */
`
const Button2 = styled.button`
  width: 150px;
  height: 40px;
  margin: 10px;
`

export default CreateGroup;