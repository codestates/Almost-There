import styled from "styled-components";
import { useEffect } from 'react';



declare global {
  interface Window {
    kakao: any;
  }
}



//전역객체

function Map () {

  useEffect(() => {

    const markerPosition  = new window.kakao.maps.LatLng(33.450701, 126.570667); 


    const container = document.getElementById("map");
    // const container =getElementById(map: string): HTMLElement | null;
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
    };
    
    const map = new window.kakao.maps.Map(container, options);
        // 마커를 생성합니다
        var marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    



  }, []);

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
        <Mapbox id="map">
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