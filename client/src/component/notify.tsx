import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import url from '../url';

type NotifyProps = {
  list: Array<any>,
  setList: React.Dispatch<React.SetStateAction<Array<any>>>
}

const Notify = ({list, setList}: NotifyProps) => {
  const navigate = useNavigate();

  const handleDrop = async (idx: string) => {
    try {
      // await axios.delete(`${url}/notification`, {withCredentials: true});
      setList([...list.slice(0, Number(idx)), ...list.slice(Number(idx)+1)]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleMove = (id: string) => {
    navigate(`/group/${id}`);
  }

  useEffect(() => {
    const getList = async () => {
      const res = await axios.get(`${url}/notification/list`, { withCredentials: true });
      console.log(res.data);
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
    <MenuWrap>
      <div>
        {
          list.map((el, idx) => {
            switch (el.notifyType) {
              case 'invite':
                return (
                  <Notice key={el.id}>
                    <Title>{el.sender}님의 그룹에 초대되었습니다.</Title>
                    <Confirm>
                      <Move id={`${el.groupId}`} onClick={(e) => handleMove(e.currentTarget.id)}>그룹으로 이동</Move>
                      <Drop id={`${idx}`} onClick={(e) => handleDrop(e.currentTarget.id)}>확인</Drop>
                    </Confirm>
                  </Notice>
                )
              case 'arrive':
                return (
                  <Notice key={el.id}>
                    <Title>{el.sender}님이 약속 장소에 도착했습니다.</Title>
                    <Confirm>
                      <Drop id={`${idx}`} onClick={(e) => handleDrop(e.currentTarget.id)}>확인</Drop>
                    </Confirm>
                  </Notice>
                )
              case 'leave':
                return (
                  <Notice key={el.id}>
                    <Title>{el.sender}님이 그룹에서 떠났습니다.</Title>
                    <Confirm>
                      <Drop id={`${idx}`} onClick={(e) => handleDrop(e.currentTarget.id)}>확인</Drop>
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
  )
}

const MenuWrap = styled.div`
  position: fixed;
  animation: reveal 1s;
  top: 7vh;
  right: 0px;
  width: 350px;
  height: 40vh;
  overflow: auto;
  background-color: rgba(0, 0, 255, 0.4);
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
  width: 350px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  border: solid black 1px;
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
`

export default Notify;