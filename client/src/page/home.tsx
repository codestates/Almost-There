import axios from 'axios';
import React, { useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import url from '../url';
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Home1 from "../data/Home1.png"

interface User {
  userId: string,
  email: string,
  name: string
}

type HomeProps = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
  setUser: React.Dispatch<React.SetStateAction<User>>
}

function Home ({setLogin, setUser}: HomeProps) {
  let code = new URL(window.location.href).searchParams.get('code');
  let userState = new URL(window.location.href).searchParams.get('state');
  const homeRef = useRef(null);
  const navigate = useNavigate();
  const text1 = " 30분째 거의 다 왔다고만 하는 친구 때문에 \n  더 이상 애태우지 마세요! "
  const text2 = " 나 기다리게 하지 마라... \n 도착했음을 친구들에게 알릴 수 있어요 "
  const text3 = " 일찍 도착해, 늦게 도착해? \n도착 예정 시간을 친구들에게 미리 알리세요 "

  useEffect(() => {
    switch (localStorage.getItem('social')) {
      case 'naver' :
        console.log(code);
        const sendNaver = async () => {
          const res = await axios.post(`${url}/social/naver`, { 
            code: code, state: userState
          }, { withCredentials: true });
          const {userId, name, email} = res.data.data;
          setUser({
            userId,
            name,
            email
          })
          setLogin(true);
        }
        sendNaver();
        break;
      case 'kakao' :
        const sendKakao = async () => {
          const res = await axios.post(`${url}/social/kakaotalk`, { 
            authorizationCode: code,
          }, { withCredentials: true });
          const {userId, name, email} = res.data.data;
          setUser({
            userId,
            name,
            email
          })
          setLogin(true);
        }
        sendKakao();
        break;
      case 'google' :
        const sendGoogle = async () => {
          const res = await axios.post(`${url}/social/google`, { 
            authorizationCode: code
          }, { withCredentials: true });
          const {userId, name, email} = res.data.data;
          setUser({
            userId,
            name,
            email
          })
          setLogin(true);
        }
        sendGoogle();
        break;
      default:
        break;
    }
    localStorage.removeItem('social');
    navigate('/');
  }, []);

  
  
  function animateFrom(elem:HTMLElement , direction?:any) {
    direction = direction || 1;
    var x = 0,
        y = direction * 100;
    if(elem.classList.contains("gs_reveal_fromLeft")) {
      x = -100;
      y = 0;
    } else if (elem.classList.contains("gs_reveal_fromRight")) {
      x = 100;
      y = 0;
    }
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
      duration: 3, 
      x: 0,
      y: 0, 
      autoAlpha: 1, 
      ease: "expo", 
      overwrite: "auto"
    });
  }
  
  function hide(elem:HTMLElement) {
    gsap.set(elem, {autoAlpha: 0});
  }
  
  // document.addEventListener("DOMContentLoaded",function() {
  //   gsap.registerPlugin(ScrollTrigger);
    
  //   gsap.utils.toArray(".gs_reveal").forEach(function(elem:any) {
  //     hide(elem); // assure that the element is hidden when scrolled into view
  //     // console.log(elem);
  //     ScrollTrigger.create({
  //       trigger: elem,
  //       onEnter: function() { animateFrom(elem) }, 
  //       onEnterBack: function() { animateFrom(elem, -1) },
  //       onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
  //     });
  //   });
  // });
  useEffect(() => {
    function foo() {
      gsap.registerPlugin(ScrollTrigger);
      
      gsap.utils.toArray(".gs_reveal").forEach(function(elem:any) {
        hide(elem); // assure that the element is hidden when scrolled into view
        // console.log(elem);
        ScrollTrigger.create({
          trigger: elem,
          onEnter: function() { animateFrom(elem) }, 
          onEnterBack: function() { animateFrom(elem, -1) },
          onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
        });
      });
    }
    foo();
  }, [])

  return (
    <>
    <div ref={homeRef}>
      <IntroduceMain>
          <MainLeft>
            <Slogan>
              약속장소에 거의 다 왔다고만 하는 친구가 어디에 있는지 궁금할 때
            </Slogan>
            <Title>
              Almost There
            </Title>
            <Start>
              시작하기/체험하기
            </Start>
          </MainLeft>
          <MainRight>
            <MainRightImage>
            </MainRightImage>
          </MainRight>
      </IntroduceMain>
      <Introduce1>
        <Image1 className="gs_reveal gs_reveal_fromLeft">
          <img alt="profile" className="scale-down" src={Home1} />
        </Image1>
        <TextBox1 className="gs_reveal gs_reveal_fromRight">
          <Text1>
            {text1}
          </Text1>
        </TextBox1>
      </Introduce1>
      <Introduce2>
        <TextBox2 className='gs_reveal gs_reveal_fromLeft'>
          <Text2>
            {text2}
          </Text2>
        </TextBox2>
        <Image2 className='gs_reveal gs_reveal_fromRight'></Image2>
      </Introduce2>
      <Introduce3>
        <Image3 className='gs_reveal gs_reveal_fromLeft'></Image3>
        <TextBox3 className='gs_reveal gs_reveal_fromRight'>
          <Text3>
            {text3}
          </Text3>
        </TextBox3>
      </Introduce3>




    <footer></footer>
    </div>
    </>
  )
}




const IntroduceMain = styled.div`
  border-radius : 4px;
  border: solid red;
  background-color: #e1bee7;
  height: 500px;
  display:flex;
  flex-direction:row;
  padding: 30px 0px 0px 0px;

`

const Introduce1 = styled.div`
  border-radius : 1px;
  border: solid yellow;
  background-color: #f8bbd0;
  height: 1000px;
  display:flex;
  flex-direction:row;
`
const Introduce2 = styled.div`
  border-radius : 1px;
  border: solid yellow;
  background-color: #c5cae9;
  height: 500px;
  display:flex;
  flex-direction:row;


`
const Introduce3 = styled.div`
  border-radius : 1px;
  border: solid yellow;
  background-color: #b2dfdb;
  height: 500px;
  display:flex;
  flex-direction:row;


`


const MainLeft = styled.div`
  border-radius : 1px;
  border: solid pink;
  /* height:490px; */
  width:50vw;
  display:flex;
  flex-direction:column;


`

const MainRight = styled.div`
  border-radius : 1px;
  border: solid blue;
  /* height:490px; */
  width:50vw;


`
const MainRightImage = styled.div`
  border-radius : 1px;
  border: solid blue;
  background-color:gray;
  height:350px;
  width:35vw;
  margin: 0px 150px 0px 150px;   
`


const Slogan = styled.div`
  border-radius : 1px;
  border: solid blue;
  height:50px;
  font-size:30px;

`

const Title = styled.div`
  border-radius : 1px;
  border: solid blue;
  height:250px;
  font-size:90px;


`
const Start = styled.div`
  border-radius : 1px;
  border: solid blue;
  height:50px;
  font-size:30px;
`

const Image1 = styled.div`
  border-radius : 1px;
  border: solid yellow;
  background-color: gray;
  height: 800px;
  width: 40vw;
  margin: 70px 50px 70px 50px;
  img {
    width: 40vw;
    height: 800px; 
  }
  &.gs_reveal {
    opacity: 0;
    visibility: hidden;
    will-change: transform, opacity;
  }  
`

const Image2 = styled.div`
  border-radius : 1px;
  border: solid yellow;
  background-color: gray;
  height: 500px;
  width: 50vw;
  height: 350px;
  width: 40vw;
  margin: 70px 50px 70px 50px;   

`
const Image3 = styled.div`
  border-radius : 1px;
  border: solid yellow;
  background-color: gray;
  height: 350px;
  width: 40vw;
  margin: 70px 50px 70px 50px;   

`
const TextBox1 = styled.div`
  border-radius : 1px;
  border: solid yellow;
  background-color: #f8bbd0;
  background-color: green;
  /* height: 500px; */
  /* height: 500px;
  width: 50vw; */
  height: 350px;
  width: 40vw;
  margin: 70px 50px 70px 150px;   
  display:flex;
  align-items: center;
  justify-content: center;
  &.gs_reveal {
    opacity: 0;
    visibility: hidden;
    will-change: transform, opacity;
  }

`
const TextBox2 = styled.div`
  border-radius : 1px;
  border: solid yellow;
  background-color: #f8bbd0;
  height: 350px;
  width: 40vw;
  margin: 70px 150px 70px 50px;   
  display:flex;
  align-items: center;
  justify-content: center;

`
const TextBox3 = styled.div`
  border-radius : 1px;
  border: solid yellow;
  background-color: #f8bbd0;
  height: 350px;
  width: 40vw;
  margin: 70px 50px 70px 150px;   
  display:flex;
  align-items: center;
  justify-content: center;

`

const Text1 = styled.div`
  border-radius : 1px;
  border: solid yellow;
  background-color: #f8bbd0;
  font-size:30px;
  text-align:center;
  vertical-align:middle;
  white-space: pre-line;
`
const Text2 = styled.div`
  border-radius : 1px;
  border: solid yellow;
  background-color: #f8bbd0;
  font-size:30px;
  text-align:center;
  vertical-align:middle;
  white-space: pre-line;

  `

const Text3 = styled.div`
  border-radius : 1px;
  border: solid yellow;
  background-color: #f8bbd0;
  font-size:30px;
  text-align:center;
  vertical-align:middle;
  white-space: pre-line;

  `

export default Home;



