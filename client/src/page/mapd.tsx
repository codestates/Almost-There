import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import url from '../url';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../context';


interface Pos {
  x: number,
  y: number
}
//전역객체
const { kakao } = window;

function Mapd () {
  const [target, setTarget] = useState<Pos>({
    x: 126.9706,
    y: 37.5546
  })
  const mapRef = useRef<HTMLDivElement>(null);
  const params= useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/exp2`);
  }

  useEffect(() => {
    const markerPosition  = new kakao.maps.LatLng(target.y, target.x);  
    const container = mapRef.current;
    const options = { center: new kakao.maps.LatLng(target.y,target.x) }
    const map = new kakao.maps.Map(container, options);
    const marker = new kakao.maps.Marker({
      position: markerPosition
    });
    
    marker.setMap(map);

  }, []);

  return(
    <div>
      <Outer>          
      <div>
        <Mapbox ref={mapRef} id="map"  >
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
const Text = styled.div`
  font-size: 25px;
  font-weight: bold;
`


export default Mapd;