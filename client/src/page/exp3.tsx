import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { complete } from '../data'

const Exp3 = () => {
  return (
    <Background >
      <Img src={complete}></Img>
      <Text>그룹원 모두 약속 장소에 도착했습니다!</Text>
      <StyledLink to={"/"} className="home">홈으로 이동하기</StyledLink>
    </Background>

  )
}

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Img = styled.img`
  width: 80vw;
  height: 80vh;
`
const Text = styled.div`
  position: fixed;
  top: 35vh;
  color: black;
  background-color: white;
  border-radius: 5px;
  text-shadow: white 0px 0px 5px;
  font-size: 40px;
  font-weight: bold;
`

const StyledLink = styled(Link)`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  color: black;
  background-color: #eeeeee;
  border-radius: 5px;
  font-size: 25px;
  font-weight: bold;
  text-decoration: none;
  :hover {
    background-color: black;
    color: white;
  }
  &.home {
    left: 10%;
    right: 10%;
    bottom: 10vh;
  }
  &.group {
    right: 20vw;
    bottom: 10vh;
  }
`
export default Exp3;