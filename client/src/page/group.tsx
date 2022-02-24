import styled from 'styled-components';
import { Timer } from '.';



function Group () {
  return (
    <Background>
      <Container>
        <Contents1>
          <List1>
            <Title1>그룹 이름</Title1>
            <Icon>그룹원</Icon>
          </List1>
          <List1>
            <Title1>xxx구 xxx로 123</Title1>
            <Icon>지도</Icon>
          </List1>
          <List1>
            <Title3>2월 22일 오후 5:00</Title3>
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

export default Group;