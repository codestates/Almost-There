import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { complete } from '../data/index'

const Complete = () => {
  return (
    <Background >
      <Img src={complete}></Img>
      <Text>그룹원 모두 약속 장소에 도착했습니다!</Text>
      <StyledLink to={"/"} className="home">홈으로 이동하기</StyledLink>
      <StyledLink to={"/creategroup"} className="group">그룹 생성 하기</StyledLink>
    </Background>

  )
}

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Img = styled.img`
  width: 100vw;
  height: 93vh;
`
const Text = styled.div`
  position: fixed;
  top: 40vh;
  color: white;
  font-size: 30px;
  font-weight: bold;
`

const StyledLink = styled(Link)`
  position: fixed;
  color: yellow;
  &.home {
    left: 10vh;
    bottom: 10vh;
  }
  &.group {
    right: 10vh;
    bottom: 10vh;
  }
`

export default Complete;