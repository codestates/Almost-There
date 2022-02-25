import styled from "styled-components";
import { useState, useCallback,useEffect } from "react";
import url from '../url';
import axios from "axios";
import { useParams } from 'react-router-dom';



declare global {
  interface Window {
    kakao: any;
  }
}
//전역객체

function Map () {

  const [x, setx] = useState(37.48276303605517);
  const [y, sety] = useState(127.03557641134296);
  const params= useParams();

  useEffect(() => {
    const latdes2 = 37.48276303605517;
    const ingdes2 = 127.03557641134296;
    // const markerPosition  = new window.kakao.maps.LatLng(37.48276303605517,127.03557641134296); 
    const markerPosition  = new window.kakao.maps.LatLng(y,x);  
    // 목적지 좌표표시
    const container = document.getElementById("map");
    // const container =getElementById(map: string): HTMLElement | null;
    const options = {
      center: new window.kakao.maps.LatLng(37.48276303605517,127.03557641134296),
    };
    const map = new window.kakao.maps.Map(container, options);
        // 마커를 생성합니다
        var marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        console.log(getlatdes())
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
  }, []);


  const getlatdes = () => {
    console.log('test')
    axios
    .get(
    `${url}/group/list`,
    {withCredentials:true}
    )
    .then((res) => {
      // console.log('test2')
      // console.log(res)
      const filtered = res.data.groups.filter((el:any)=>{
    // filter 사용하여 id가 00인 그룹정보 불러오기
    // return el.groupId === 3
    // console.log(params.id)
    return el.groupId === 60;    
    // return el.id === Number(params.id);        
  })
    // console.log(res.data.groups[0]._group.name)
    // console.log(res.data.groups[0]._group)
    console.log(filtered[0]._group)
    // setingdes(res.data.groups[0]._group.name)
    // setx()
    // sety()
  })
    .catch((err) => {
    });
  }
  // constructor(props: MapProps) {
  //   super(props)
  //   this.onComponentMount = this.onComponentMount.bind(this)
  //   this._onBoundChanged = this._onBoundChanged.bind(this)
  //   this._onCenterChanged = this._onCenterChanged.bind(this)
  //   this._onClick = this._onClick.bind(this)
  //   this._onLoad = this._onLoad.bind(this)
  //   this._onZoomChanged = this._onZoomChanged.bind(this)
  // }


  return(
    <div>
      <Outer>          
      <div>
        <Mapbox id="map"  >
        {/* <div id="map" /> */}
        </Mapbox>
      </div>
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
    ;
  `
    const Outer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100vw;
    height:93vh;
  `



export default Map;