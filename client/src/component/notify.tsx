import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import url from '../url';

type NotifyProps = {
  list: Array<any>,
  setList: React.Dispatch<React.SetStateAction<Array<any>>>,
  show: ShowList,
  setShow: React.Dispatch<React.SetStateAction<ShowList>>
}

const Notify = ({list, setList, show, setShow}: NotifyProps) => {
  const navigate = useNavigate();

  const handleDrop = async (id: string) => {
    try {
      console.log('a');
      console.log(id);
      await axios.delete(`${url}/notification/${id}`, {withCredentials: true});
      const filter = list.filter((el) => {
        return el.id.toString() !== id
      })
      console.log(filter);
      setList([...filter]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleMove = (id: string) => {
    navigate(`/group/${id}`);
  }

  const clickBack = () => {
    setShow({
      ...show,
      notify: false
    })
  }

  useEffect(() => {
    const getList = async () => {
      const res = await axios.get(`${url}/notification/list`, { withCredentials: true });
      console.log(res.data);
      // groupId, groupname
      const filter = res.data.notice.map((el:any) => {
        return {
          id :el.id,
          sender: el.sender,
          notifyType: el.notification.notifyType
        }
      })
      setList([...filter]);
    }
    getList();
  }, []);

  return (
    <Backdrop onClick={() => clickBack()}>
      <MenuWrap onClick={(e) => e.stopPropagation()}>
        <div>
          {
            list.map((el) => {
              switch (el.notifyType) {
                case 'invite':
                  return (
                    <Notice key={el.id}>
                      <Title>{el.sender}님의 그룹에 초대되었습니다.</Title>
                      <Confirm>
                        {/* <Move id={`${el.groupId}`} onClick={(e) => handleMove(e.currentTarget.id)}>그룹으로 이동</Move> */}
                        <Drop id={`${el.id}`} onClick={(e) => handleDrop(e.currentTarget.id)}><Text>확인</Text></Drop>
                      </Confirm>
                    </Notice>
                  )
                case 'arrive':
                  return (
                    <Notice key={el.id}>
                      <Title>{el.sender}님이 약속 장소에 도착했습니다.</Title>
                      <Confirm>
                        <Drop id={`${el.id}`} onClick={(e) => handleDrop(e.currentTarget.id)}><Text>확인</Text></Drop>
                      </Confirm>
                    </Notice>
                  )
                case 'leave':
                  return (
                    <Notice key={el.id}>
                      <Title>{el.sender}님이 그룹에서 떠났습니다.</Title>
                      <Confirm>
                        <Drop id={`${el.id}`} onClick={(e) => handleDrop(e.currentTarget.id)}><Text>확인</Text></Drop>
                      </Confirm>
                    </Notice>
                  )
                default:
                  break;
              }
            })
          }
        </div>
      </MenuWrap>
    </Backdrop>
  )
}

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
`

const MenuWrap = styled.div`
  position: fixed;
  animation: reveal 1s;
  top: 7vh;
  right: 0px;
  width: 350px;
  height: 40vh;
  overflow: auto;
  background-color: #eeffff;
  border-radius: 10px;
  z-index: 1;

  @keyframes reveal {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0%);
    }
  }
  @keyframes disappear {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translate(100%);
    }
  }
`
const Notice = styled.div`
  width: 340px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #bbdefb;
  margin: 5px 5px;
  border-radius: 10px;
  border: solid black 1px;
`
const Text = styled.div`
  margin: 0px 10px 0px 0px;
  font-weight: bold;
`
const Confirm = styled.div`
  width: 350px;
  display: flex;
  justify-content: right;
  align-items: center;
`
const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
`
const Move = styled.div`
  color: orange;
  margin: 0px 5px;
`
const Drop = styled.div`
  color: green;
  margin: 0px 5px;
  :hover {
    cursor: pointer;
  }
`

export default Notify;