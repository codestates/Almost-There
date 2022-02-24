import { useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

type KeyMapProps = {
  location: string
}

const {kakao} = window;

const KeyMap = ({location}:KeyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const placesListRef = useRef<HTMLUListElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const [places, setPlaces] = useState<Array<any>>([]);

  useEffect(() => {
    let markers:Array<any> = [];
    const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };  
    // 지도를 생성합니다    
    const map = new kakao.maps.Map(mapContainer, mapOption); 
    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();  
    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({zIndex:1});
    // 키워드로 장소를 검색합니다
    searchPlaces();

    // 키워드 검색을 요청하는 함수입니다
    function searchPlaces() {
    const keyword = location;//keywordRef.current?.value;//document.getElementById('keyword').value;
    if (!keyword?.replace(/^\s+|\s+$/g, '')) {
    // alert('키워드를 입력해주세요!');
      setPlaces([]);
      return false;
    }
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch( keyword, placesSearchCB); 
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data: Array<any>, status: string, pagination: any) {
      console.log('data');
      console.log(data);
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);
        // 페이지 번호를 표출합니다
        // displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // alert('검색 결과가 존재하지 않습니다.');
        setPlaces([]);
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        // alert('검색 결과 중 오류가 발생했습니다.');
        setPlaces([]);
        return;
      }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places:Array<any>) {
      // const listEl = document.getElementById('placesList');
      const menuEl = document.getElementById('menu_wrap'),
      // fragment = document.createDocumentFragment(), 
      bounds = new kakao.maps.LatLngBounds(), 
      listStr = '';
      // 검색 결과 목록에 추가된 항목들을 제거합니다
      // removeAllChildNods(listEl);
      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();
      setPlaces([...places]);
      for ( let i=0; i<places.length; i++ ) {
        // 마커를 생성하고 지도에 표시합니다
        const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
        marker = addMarker(placePosition, i);
        //itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);
        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, title) {
          kakao.maps.event.addListener(marker, 'mouseover', function() {
            displayInfowindow(marker, title);
          });
          kakao.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
          });
          // itemEl.onmouseover =  function () {
          //   displayInfowindow(marker, title);
          // };
          // itemEl.onmouseout =  function () {
          //   infowindow.close();
          // };
        })(marker, places[i].place_name);
        //fragment.appendChild(itemEl);
      }
      // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
      // listEl?.appendChild(fragment);
      if (menuEl) menuEl.scrollTop = 0;
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    // function getListItem(index: number, places: any) {
    //   /* places
    //   address_name: "서울 용산구 동자동 43-205"
    //   category_group_code: ""
    //   category_group_name: ""
    //   category_name: "교통,수송 > 기차,철도 > 기차역 > KTX정차역"
    //   distance: ""
    //   id: "9113903"
    //   phone: "1544-7788"
    //   place_name: "서울역"
    //   place_url: "http://place.map.kakao.com/9113903"
    //   road_address_name: "서울 용산구 한강대로 405"
    //   x: "126.970606917394"
    //   y: "37.5546788388674"
    //   */
    //   console.log(places);
    //   const el = document.createElement('li');
    //   let itemStr = //'<span class="markerbg marker_' + (index+1) + '"></span>' +
    //   '<div class="info">' +
    //   '   <h5>' + places.place_name + '</h5>';
    //   if (places.road_address_name) {
    //     itemStr += '    <div>' + places.road_address_name + '</div>' +
    //     '   <div>' +  places.address_name  + '</div>';
    //   } else {
    //     itemStr += '    <div>' +  places.address_name  + '</div>'; 
    //   }
    //   itemStr += '  <div>' + places.phone  + '</div>' +
    //   '</div>';           
    //   el.innerHTML = itemStr;
    //   el.className = 'item';
    //   return el;
    // }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position: any, idx: number, title?: string) {
      /* position
      {La: 126.97209238331357, Ma: 37.55597933890212}
      */
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
      imgOptions =  {
        spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage 
      });
      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker);  // 배열에 생성된 마커를 추가합니다
      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for ( let i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
      }   
      markers = [];
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    function displayPagination(pagination: any) {
      const paginationEl = document.getElementById('pagination'),
      fragment = document.createDocumentFragment()
      let i; 
      console.log(pagination);
      // 기존에 추가된 페이지번호를 삭제합니다
      while (paginationEl?.hasChildNodes()) {
      if(paginationEl.lastChild)
        paginationEl.removeChild(paginationEl.lastChild);
      }
      for (i=1; i<=pagination.last; i++) {
        const el = document.createElement('a');
        el.href = "#";
        el.innerHTML = String(i);
        if (i===pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = (function(i) {
            return function() {
              pagination.gotoPage(i);
            }
          })(i);
        }
        fragment.appendChild(el);
      }
      paginationEl?.appendChild(fragment);
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(marker:Array<any>, title: string) {
      const content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    // function removeAllChildNods(el:any) {   
    //   while (el.hasChildNodes()) {
    //     el.removeChild (el.lastChild);
    //   }
    // }
  }, [location])

  return (
    <MapWrap>
      <Map ref={mapRef} id="map"></Map>
      <MenuWrap id="menu_wrap" >
        <Option>
        </Option>
        <div>
          <Ul ref={placesListRef} id="placesList">
            {places
              ? places.map((el, idx) => {
                  return (
                    <li key={el.id} id={`${idx}`}>
                      <h5>{el.place_name}</h5>
                      <div>{el.address_name}</div>
                      <div>{el.phone}</div>
                    </li>
                  )
                })
              : <></>
            }
          </Ul>
          <Page ref={paginationRef} id="pagination"></Page>
        </div>
      </MenuWrap>
    </MapWrap>
  )
}

const MapWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
  display:flex;
  justify-content:center;
  align-items:center;
`
const Map = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: blue;
`
const MenuWrap = styled.div`
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  width:250px;
  margin:10px 0 30px 10px;
  padding:5px;
  overflow-y:auto;
  background:rgba(255, 255, 255, 0.7);
  z-index: 12;
  font-size:12px;
  border-radius: 10px;
  
`
const Option = styled.div`
  text-align: center;
`
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 5px;
  li {
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: wheat;
    margin: 0;
    :hover {
      background-color: rgba(52, 106, 255, 0.4);
      cursor: pointer;
    }
  }

`
const Page = styled.div`
  margin: 10px;
  text-align: center;
  &a {
    display: inline-block;
    margin-right: 10px;
  }
  &.on {
    font-weight: bold;
    cursor: default;
    color: #777;
  }
`

export default KeyMap;