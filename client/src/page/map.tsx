import styled from "styled-components";
import { useState, useEffect } from "react";
import url from '../url';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../context';



declare global {
  interface Window {
    kakao: any
  }
}

interface Pos {
  x: number,
  y: number
}
//전역객체
const { kakao } = window;

type MapProps = {
  user: User
}

function Map ({ user }: MapProps) {
  const [target, setTarget] = useState<Pos>({
    x: 127.03557641134296,
    y: 37.48276303605517
  })
  const [member, setMember] = useState<Pos>({
    x: 127.0350,
    y: 37.4830
  })
  const params= useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    socket.emit("leave", `${params.userId}`);
    navigate(`/group/${params.groupId}`);
  }

  const getlatdes = async () => {
    const res = await axios.get(`${url}/group/memberInfo?groupId=${params.groupId}`, {withCredentials:true});
    setTarget({
      x: Number(res.data.groupInfo.x),
      y: Number(res.data.groupInfo.y)
    })
    // const res2 = await axios.get(`${url}/group/memberInfo?groupId=${params.groupId}`,
    // {withCredentials: true});
    if (params.userId) { //socket으로 변환
      socket.emit("join", `${params.userId}`);
      socket.on("getPosition", (data) => {
        console.log('getPosition');
        console.log(data);
        setMember({
          x: data.x,
          y: data.y
        });
      });
      setMember({
        x: Number(res.data.groupInfo.x) + 0.0005,
        y: Number(res.data.groupInfo.y) + 0.0005
      })
    }
  }

  useEffect(() => {
    getlatdes();
  }, []);

  useEffect(() => {
    const markerPosition  = new kakao.maps.LatLng(target.y, target.x);  
    const container = document.getElementById("map");
    const options = params.userId 
      ? { center: new kakao.maps.LatLng(member.y, member.x) }
      : { center: new kakao.maps.LatLng(target.y,target.x) }
    const map = new kakao.maps.Map(container, options);
    const marker = new kakao.maps.Marker({
      position: markerPosition
    });
    if (params.userId) {
      const content = '<span class="user">!</span>';
      const position = new kakao.maps.LatLng(member.y, member.x);  
      const customOverlay = new kakao.maps.CustomOverlay({
          position: position,
          content: content   
      });
      customOverlay.setMap(map);
    }
    
    marker.setMap(map);

  }, [target, member]);

  return(
    <div>
      <Outer>          
      <div>
        <Mapbox id="map"  >
        {/* <div id="map" /> */}
        </Mapbox>
      </div>
      <GoBack onClick={handleBack}>
        {/* <LeftIcon></LeftIcon> */}
        <Text>돌아가기</Text>
      </GoBack>
      </Outer>
    </div>
  )
}

const Mapbox = styled.div`
  
  width:100vw;
  height:93vh;
  /* @media screen and (max-width:760px){
  width:360px;
  height:360px;
  } */

  span {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: red;
    z-index: 1;
    animation: spread;
    animation-iteration-count: infinite;//name duration timing-function delay iteration-count direction fill-mode;
    animation-duration: 1s;
    @keyframes spread {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`
const Outer = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100vw;
  height:93vh;
`
const GoBack = styled.div`
  width: 150px;
  height: 75px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 20;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: white;
  background-color: #448aff;
  border-radius: 10px;
  cursor: pointer;
`
const LeftIcon = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
`
const Text = styled.div`
  font-size: 25px;
  font-weight: bold;
`


export default Map;