import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';
import url from './url';

interface Pos {
  x: number,
  y: number
}

interface MyPosition {
  user: User,
  position: Pos
}


// axios.post로 위치 정보를 바꿀 때 마다 socket.to(userId).emit("getPosition", data: MyPosition);
// io.to(userId).emit("invite", userId: string); // for 문 돌려서 보내기
// arrive leave => to(groupId)
interface ServerToClientEvents {
  getPosition: (data:Pos) => void
  notify: (contents: string, userId: string) => void
}

// user3 
// map/groupId/userId => socket.on("join", {params.userId})
// 페이지 나갈 때 socket.on("leave", {params.userId})
// socket.on("getPosition")
interface ClientToServerEvents {
  login: (user: User) => void
  logout: (user: User) => void
  join: (userId: string) => void
  leave: (userId: string) => void
  sendPosition: (data: MyPosition) => void
  notify: (type: string, sender: string, groupId:string) => void// 도착, 초대, 탈퇴
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(`${url}`, {
  withCredentials: true
});
export const SocketContext = createContext(socket);
