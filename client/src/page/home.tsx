import axios from 'axios';
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import url from '../url';
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Home0 from "../data/Home0.png"
import Home1 from "../data/Home1.png"
import Home2 from "../data/Home2.png"
import Home3 from "../data/Home3.png"
import gps from "../data/gps.png"


// import {Home2} from "../data/index"
// import Homeaa from "../data/Homeaa.png"



interface User {
  userId: string,
  email: string,
  name: string
}

type HomeProps = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
  setUser: React.Dispatch<React.SetStateAction<User>>
  login: boolean
}

function Home ({setLogin, setUser, login }: HomeProps) {
  let code = new URL(window.location.href).searchParams.get('code');
  let userState = new URL(window.location.href).searchParams.get('state');
  const homeRef = useRef(null);
  const navigate = useNavigate();
  const text0 = "약속장소에 거의 다 왔다고만 하는 친구가 \n 어디에 있는지 궁금할 때"
  const text1 = " 30분째 거의 다 왔다고만 \n하는 친구 때문에 \n  답답했던 경험 있으시죠? "
  // const text11 = "약속시간 10분 전부터 \n 친구의 위치를 파악할 수 있습니다."
  
  const text2 = "나의 도착여부를 \n 친구들에게 알릴 수 있어요 "
  const text21 = "\n 약속장소에 도착한 후 \n 그룹원에게 자동으로 도착알림이 도착합니다."

  // const text3 = " 친구가 지금 어디에 있는지 \n 실시간으로 알 수 있습니다. "
  const text31 = "실시간 위치파악기능을 통해 \n 친구의 위치를 파악할 수 있습니다."

  const clickHome = () => {
    navigate('/creategroup');
  }




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
              {text0}
            </Slogan>
            <Title>
              Almost There
              <Logo>
              <img alt="profile" className="scale-down" src={gps} />
              </Logo>
            </Title>
            {login 
              ? <Start
              onClick={clickHome}
              >시작하기</Start>
              : <Start> 체험하기</Start>
              }

            {/* </Start> */}
          </MainLeft>
          <div></div>
          <MainRight>
            <MainRightImage>
              <img alt="profile" className="scale-down" src={Home0} />
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
          <Text11>
            {/* {text11} */}
          </Text11>

        </TextBox1>
      </Introduce1>
      <Introduce3>
        <TextBox3 className='gs_reveal gs_reveal_fromLeft'>
          {/* <Text3>
            {text3}
          </Text3> */}
          <Text31>
            {text31}
          </Text31>
 
        </TextBox3>
        <Image3 className='gs_reveal gs_reveal_fromRight'>
          <img alt="profile" className="scale-down" src={Home3} />

        </Image3>

      </Introduce3>
      <Introduce2>
        <Image2 className='gs_reveal gs_reveal_fromLeft'>
        <img alt="profile" className="scale-down" src={Home2} />
        </Image2>
        <TextBox2 className='gs_reveal gs_reveal_fromRight'>
          <Text2>
            {text2}
          </Text2>
          <Text21>
            {text21}
          </Text21>

        </TextBox2>


      </Introduce2>




    <footer></footer>
    </div>
    </>
  )
}




const IntroduceMain = styled.div`
  border-radius : 4px;
  /* border: solid red; */
  background-color: #eeeeee;

  /* background-color: #e1bee7; */
  /* background-color:#ffffff; */
  /* background-color:#b6c4d9; */
    flex-direction:row;

  height: 800px;
  display:flex;
  /* justify-content:space-evenly; */
  align-items:center;

  @media screen and (max-width: 960px){
    /* width: 450px;     */
    flex-direction:row;
  }
  @media screen and (max-width: 720px){
    /* width: 450px;     */
    flex-direction:column;
    height:1000px;
  }

  padding: 30px 0px 0px 0px;

`

const Introduce1 = styled.div`
  height: 800px;
  border-radius : 1px;
  /* border: solid red; */
  background-color:#e0e0e0;
  display:flex;
  justify-content:space-evenly;
  align-items:center;
  @media screen and (max-width: 1300px){
    height:500px;
  }

  @media screen and (max-width: 720px){
    flex-direction:column
  }


  display:flex;
`
const Introduce2 = styled.div`
  height: 800px;
  border-radius : 1px;
  /* border: solid blue; */
  background-color:#e0e0e0;
  display:flex;
  justify-content:space-evenly;
  align-items:center;
  @media screen and (max-width: 1300px){
    height:500px;
  }

  @media screen and (max-width: 720px){
    flex-direction:column;
    height: 700px;
  }


  display:flex;

`
const Introduce3 = styled.div`
  height: 800px;
  border-radius : 1px;
  /* border: solid red; */
  background-color:#eeeeee;
  display:flex;
  justify-content:space-evenly;
  align-items:center;
  @media screen and (max-width: 1300px){
    height:500px;
  }

  @media screen and (max-width: 720px){
    flex-direction:column-reverse;
    height: 700px;

  }
  

`


const MainLeft = styled.div`
  border-radius : 1px;
  /* border: solid red; */
  /* height:490px; */
  width:50vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  @media screen and (max-width: 720px){
    width: 30vw;
  }
  @media screen and (max-width: 400px){
    width: 100vw;
    /* height:400px; */
  }
`

const MainRight = styled.div`
  border-radius : 1px;
  /* border: solid blue; */
  /* height:490px; */
  width:50vw;
  display:flex;
  /* justify-content:center; */
  @media screen and (max-width: 1300px){
    height:500px;
  }
  @media screen and (max-width: 400px){
    width: 100vw;
  }
`

const MainRightImage = styled.div`
  border-radius : 1px;
  height:450px;
  width:35vw;
  margin: 0px 0px 250px 0px;

  .scale-down{
    width: 600px; 
    height: 600px;
    object-fit: scale-down;
    @media screen and (max-width: 1300px){
    width: 500px;   
    height: 500px; 
  }

    @media screen and (max-width: 960px){
    width: 400px;
    height: 400px 
  }
  @media screen and (max-width: 840px){
    width: 300px;
    height: 300px 
  }


  }
  &.gs_reveal {
    opacity: 0;
    visibility: hidden;
    will-change: transform, opacity;
  }     
`


const Slogan = styled.div`
  border-radius : 1px;
  /* border: solid blue; */
  height:100px;
  font-size:30px;
  white-space: pre-line;
    @media screen and (max-width: 1300px){
    font-size:25px;
    }

  @media screen and (max-width: 1100px){
    font-size:25px
  }
  @media screen and (max-width: 960px){
    font-size:22px;
    height:70px;
  }

  @media screen and (max-width: 840px){
    font-size:20px
  }
  @media screen and (max-width: 720px){
    font-size:16px
  }

`




const Title = styled.div`
  border-radius : 1px;
  /* border: solid blue; */
  height:450px;
  font-size:90px;
  text-align:center;
  @media screen and (max-width: 1300px){
    font-size:40px;
    height:300px;
  }

  @media screen and (max-width: 1100px){
    font-size:40px;
    height:300px;
  }
  flex-direction:column;
  @media screen and (max-width: 960px){
    height:250px;
  }
  @media screen and (max-width: 840px){
    font-size:30px;
    text-align:center
  }


`
  const Logo = styled.div`
  border-radius : 1px;
  /* border: solid red; */
  height:250px;
  font-size:90px;

  @media screen and (max-width: 1300px){
    height: 250px;
    }

  @media screen and (max-width: 1300px){
    height: 160px;
  }
  

  .scale-down{
    width: 200px; height: 300px;
    object-fit: scale-down;
    @media screen and (max-width: 1300px){
    height: 200px;
    }
    @media screen and (max-width: 840px){
      height:150px;
    }


}
`
const Start = styled.div`
  border-radius : 1px;
  /* border: solid blue; */
  height:60px;
  /* width: 20vw; */
  font-size:30px;
  align-items:center;
  @media screen and (max-width: 1300px){
    height: 50px;
    }
    @media screen and (max-width: 840px){
      height:40px;
      font-size:25px;
    }
    @media screen and (max-width: 720px){
      height:20px;
      font-size:20px;
    }


  :hover {
    background-color: #1a1a1a;
    color: white;
    cursor: pointer;
  }

`

const Image1 = styled.div`
  border-radius : 1px;
  /* border: solid yellow; */
  height: 800px;
  width: 40vw;
  /* margin: 70px 50px 70px 50px; */
  @media screen and (max-width: 1300px){
    height: 500px;
    width: 500px;
    }
    @media screen and (max-width: 840px){
    height: 400px;
    width:300px;
    }
  .scale-down{
    width: 700px; height: 800px;
    object-fit: scale-down;
    @media screen and (max-width: 1450px){
    width: 550px;
    }

    @media screen and (max-width: 1300px){
    height: 500px;
    width: 450px;
    }
    @media screen and (max-width: 960px){
      height: 400px;
      width:400px;
    }
    @media screen and (max-width: 840px){
      height: 300px;
      width:300px;
    }
    @media screen and (max-width: 400px){
      height: 200px;
      width: 200px;

    }


  }
  &.gs_reveal {
    opacity: 0;
    visibility: hidden;
    will-change: transform, opacity;
  }  
`

const Image2 = styled.div`
  border-radius : 1px;
  /* border: solid yellow; */
  height: 800px;
  width: 40vw;
  /* margin: 70px 50px 70px 50px; */
  @media screen and (max-width: 1400px){
    height: 500px;
    width: 450px;
    }

  @media screen and (max-width: 1300px){
    height: 500px;
    width: 300px;
    }
    @media screen and (max-width: 840px){
    height: 400px;
    width:300px;
    }
  .scale-down{
    width: 700px; height: 800px;
    object-fit: scale-down;
    @media screen and (max-width: 1400px){
    height: 450px;
    width: 450px;
    }

    @media screen and (max-width: 1300px){
    height: 400px;
    width: 400px;
    }
    @media screen and (max-width: 960px){
      height: 400px;
      width:300px;
    }
    @media screen and (max-width: 840px){
      height: 300px;
      width:300px;
    }
    @media screen and (max-width: 400px){
      height: 200px;
      width: 200px;

    }


  }
  &.gs_reveal {
    opacity: 0;
    visibility: hidden;
    will-change: transform, opacity;
  }  
`
const Image3 = styled.div`
  border-radius : 1px;
  /* border: solid yellow; */
  height: 800px;
  width: 35vw;
  /* margin: 70px 50px 70px 50px; */
  @media screen and (max-width: 1450px){
    height: 400px;
    width: 35vw;
    }

  @media screen and (max-width: 1300px){
    height: 400px;
    width: 400px;
    }
    @media screen and (max-width: 840px){
    height: 300px;
    width:400px;
    }
  .scale-down{
    width: 600px; height: 800px;
    object-fit: scale-down;

    @media screen and (max-width: 1450px){
    width: 550px;
    height: 550px;
    }    

    @media screen and (max-width: 1300px){
    height: 450px;
    width: 460px;
    }
    @media screen and (max-width: 960px){
      height: 400px;
      width:300px;
    }
    @media screen and (max-width: 840px){
      height: 300px;
      width:300px;
    }
    @media screen and (max-width: 400px){
      height: 200px;
      width: 200px;

    }


  }
  &.gs_reveal {
    opacity: 0;
    visibility: hidden;
    will-change: transform, opacity;
  }  
`
const TextBox1 = styled.div`
  border-radius : 1px;
  /* border: solid yellow; */
  height: 350px;
  width: 40vw;
  /* margin: 300px 50px 0px 150px;    */
  display:flex;
  align-items: center;
  /* vertical-align:middle; */
  @media screen and (max-width: 1300px){
    width: 300px;    
  }


  @media screen and (max-width: 400px){
    width: 200px;    
  }

  flex-direction:column;
  justify-content: center;
  &.gs_reveal {
    opacity: 0;
    visibility: hidden;
    will-change: transform, opacity;
  }

`
const TextBox2 = styled.div`
  border-radius : 1px;
  /* border: solid yellow; */
  /* background-color:#ffffff; */
  /* background-color: #fff9c4; */

  /* background-color: #f8bbd0; */
  height: 350px;
  width: 40vw;
  /* margin: 70px 150px 70px 50px;    */
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction:column

`
const TextBox3 = styled.div`
  border-radius : 1px;
  /* border: solid yellow; */

  height: 350px;
  width: 47vw;
  @media screen and (max-width: 1450px){
    width: 38vw;

  }
  /* margin: 70px 50px 70px 150px;    */
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction:column


`

const Text1 = styled.div`
  border-radius : 1px;
  text-align:center;
  @media screen and (max-width: 1450px){
    font-size:30px;
  }
  @media screen and (max-width: 1300px){
    font-size:30px;
  }
  @media screen and (max-width: 960px){
    font-size:25px;
  }
  font-size:50px;
  text-align:center;
  vertical-align:middle;
  white-space: pre-line;
`

const Text11 = styled.div`

  font-size:20px;
  text-align:center;
  vertical-align:middle;
  white-space: pre-line;
  @media screen and (max-width: 840px){
    font-size:20px;
  }


  @media screen and (max-width: 400px){
    font-size:10px;
  }

`


const Text2 = styled.div`
  border-radius : 1px;
  /* border: solid yellow; */
  /* background-color: #f8bbd0; */
  /* background-color:#ffffff; */
  /* background-color: #fff9c4; */

  font-size:50px;
  text-align:center;
  vertical-align:middle;
  white-space: pre-line;
  @media screen and (max-width: 1400px){
    font-size:28px;
  }

  @media screen and (max-width: 700px){
    font-size:25px;
  }

  `

const Text21 = styled.div`

  font-size:30px;
  text-align:center;
  vertical-align:middle;
  white-space: pre-line;
`



const Text3 = styled.div`
  border-radius : 1px;

  /* border: solid yellow; */
  /* background-color: #fce4ec; */
  /* background-color:#ffffff; */

  font-size:50px;
  text-align:center;
  vertical-align:middle;
  white-space: pre-line;
  /* @media screen and (max-width: 1450px){
    font-size:30px;
  } */
  @media screen and (max-width: 1300px){
    font-size:28px;
  }

  @media screen and (max-width: 960px){
    font-size:25px;
  }

  @media screen and (max-width: 700px){
    font-size:20px;
  }

  `

const Text31 = styled.div`

font-size:50px;
text-align:center;
vertical-align:middle;
white-space: pre-line;
@media screen and (max-width: 1450px){
    font-size:25px;
  }
@media screen and (max-width: 960px){
  font-size:23px;
}

@media screen and (max-width: 700px){
  font-size:20px;
}




`
export default Home;



