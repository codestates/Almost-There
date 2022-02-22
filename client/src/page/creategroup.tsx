import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


function CreateGroup () {

  const navigate = useNavigate();

  const handleCreateButton = () => {
    navigate('/group/3');
  }

  return (
    <>
    <Background>
      <Container>
        <Title>Almost There 그룹 생성</Title>
        <Contents1>
          <Box1>
            <Box2>
              <Title2>그룹 이름</Title2>
              <Box4>group1</Box4>
            </Box2>
            <Box3>
              <div>
                <button>그룹 이름 작성</button>
              </div>
            </Box3>
          </Box1>
          <Box1>
            <Box2>
              <Title2>약속 시간</Title2>
              <Box4>2022.02.22 22:00</Box4>
            </Box2>
            <Box3>
              <div>
                <button>약속 시간 선택</button>
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
                <button>약속 장소 선택</button>
              </div>
            </Box3>
          </Box1>
        </Contents1>
        <Contents2>
          <TitleBox>
            <Title3>초대 목록</Title3>
            <Invite><button>초대 하기</button></Invite>
          </TitleBox>
          <List>
            <Li>
              <NameBox>name1</NameBox>
              <DropButton><button>&times;</button></DropButton>
            </Li>
            <Li>
              <NameBox>name2</NameBox>
              <DropButton><button>&times;</button></DropButton>
            </Li>
            <Li>
              <NameBox>name3</NameBox>
              <DropButton><button>&times;</button></DropButton>
            </Li>
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
  overflow: scroll;
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
const Invite = styled.div`
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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: solid red 1px;
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