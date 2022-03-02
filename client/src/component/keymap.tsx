import React, { useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

interface Place {
  name: string,
  x: string,
  y: string
}

type KeyMapProps = {
  location: string
  setPlace: React.Dispatch<React.SetStateAction<Place>>
  setModal: React.Dispatch<React.SetStateAction<Show>>
}

const {kakao} = window;

const KeyMap = ({ location, setPlace, setModal }: KeyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const placesListRef = useRef<HTMLUListElement>(null);
  const [places, setPlaces] = useState<Array<any>>([]);

  const selectPlace = (e:string) => {
    setPlace({
      name: places[Number(e)].place_name,
      x: places[Number(e)].x,
      y: places[Number(e)].y
    })
    setModal({
      calendar: false,
      location: false,
      invite: false
    })
  }


  useEffect(() => {
    let markers:Array<any> = [];
    const keyword = location;
    const mapContainer = mapRef.current,
    mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3 
    };  
    const map = new kakao.maps.Map(mapContainer, mapOption); 
    const ps = new kakao.maps.services.Places();  
    const infowindow = new kakao.maps.InfoWindow({zIndex:1});
    
    searchPlaces();

    function searchPlaces() {
      if (!keyword?.replace(/^\s+|\s+$/g, '')) {
        setPlaces([]);
        return false;
      }
      ps.keywordSearch( keyword, placesSearchCB); 
    }

    function placesSearchCB(data: Array<any>, status: string) {
      if (status === kakao.maps.services.Status.OK) {
        displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        setPlaces([]);
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        setPlaces([]);
        return;
      }
    }

    function displayPlaces(places:Array<any>) {
      const menuEl = menuRef.current,
      bounds = new kakao.maps.LatLngBounds();
      removeMarker();
      console.log(places);
      setPlaces([...places]);
      for ( let i=0; i<places.length; i++ ) {
        const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
        marker = addMarker(placePosition, i);
        bounds.extend(placePosition);
        (function(marker, title) {
          kakao.maps.event.addListener(marker, 'mouseover', function() {
            displayInfowindow(marker, title);
          });
          kakao.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
          });
        })(marker, places[i].place_name);
      }
      if (menuEl) menuEl.scrollTop = 0;
      map.setBounds(bounds);
    }

    function addMarker(position: any, idx: number, title?: string) {
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', 
      imageSize = new kakao.maps.Size(36, 37),  
      imgOptions =  {
        spriteSize : new kakao.maps.Size(36, 691), 
        spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), 
        offset: new kakao.maps.Point(13, 37) 
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new kakao.maps.Marker({
        position: position, 
        image: markerImage 
      });
      marker.setMap(map); 
      markers.push(marker);  
      return marker;
    }

    function removeMarker() {
      for ( let i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
      }   
      markers = [];
    }

    function displayInfowindow(marker:Array<any>, title: string) {
      const content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }
  }, [location])

  return (
    <MapWrap>
      <Map ref={mapRef}>
      <MenuWrap ref={menuRef} search={location}>
        <Option>
        </Option>
        <div>
          <Ul ref={placesListRef}>
            {places
              ? places.map((el, idx) => {
                  return (
                    <li key={el.id} id={`${idx}`} onClick={(e) => selectPlace(e.currentTarget.id)}>
                      <h5>{el.place_name}</h5>
                      <div>{el.address_name}</div>
                      <div>{el.phone}</div>
                    </li>
                  )
                })
              : <></>
            }
          </Ul>
        </div>
      </MenuWrap>

      </Map>
      <MenuWrap ref={menuRef} className='hidden' search={location}>
        <Option>
        </Option>
        <div>
          <Ul ref={placesListRef}>
            {places
              ? places.map((el, idx) => {
                  return (
                    <li key={el.id} id={`${idx}`} onClick={(e) => selectPlace(e.currentTarget.id)}>
                      <h5>{el.place_name}</h5>
                      <div>{el.address_name}</div>
                      <div>{el.phone}</div>
                    </li>
                  )
                })
              : <></>
            }
          </Ul>
        </div>
      </MenuWrap>
    </MapWrap>
  )
}

const MapWrap = styled.div`
  display: flex;
  width: 600px;
  height: 600px;
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
  }
`
const Map = styled.div`
  width: 600px;
  height: 600px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
    display: none;
  }
`
interface MenuWrapI {
  search: string;
}
const MenuWrap = styled.div<MenuWrapI>`
  position:relative;
  width:200px;
  height: 600px;
  padding:5px;
  overflow-y:auto;
  display: ${(props) => props.search === '' ? 'none' : 'flex'};
  justify-content: center;
  background-color: rgba(131, 185, 255, 0.7);
  z-index: 12;
  font-size:12px;
  border-radius: 10px;
  &.hidden {
    display: none;
    @media screen and (max-width: 600px) {
      display: flex;
      justify-content: center;
      width: 300px;
      background-color: rgba(131, 185, 255, 1);
    }
  }
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
    height: 100px;
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 0;
    background-color: rgba(245, 222, 179, 0.4);
    border-top: solid black 1px;
    /* border-bottom: solid black 1px; */
    :hover {
      background-color: rgba(52, 106, 255, 0.4);
      cursor: pointer;
    }
    h5 {
      font-size: 15px;
    }
  }
`

export default KeyMap;