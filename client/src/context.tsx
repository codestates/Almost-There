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

interface GroupInfo {
  overtime: string,
  arrive: string // "true", "false", "leave"
}


// axios.post로 위치 정보를 바꿀 때 마다 socket.to(userId).emit("getPosition", data: MyPosition);
// io.to(userId).emit("invite", userId: string); // for 문 돌려서 보내기
// arrive leave => to(groupId)
interface ServerToClientEvents {
  getPosition: (data:Pos) => void
  notify: (contents: string, userId: string) => void
  groupInfo: (groupId: number, userId: string, data: GroupInfo) => void
  // groupId가 왜 string?
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
  getPosition: (userId: string) => void
  notify: (type: string, sender: string, groupId: string) => void // 도착, 초대, 탈퇴
  // overtime
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(`${url}`, {
  withCredentials: true
});
export const SocketContext = createContext(socket);

/*

! users_groups 필드추가  // arrive : "true", "false", "leave"
/group/create (POST), /group (DELETE), /group/list (GET) 수정

! overtime 이벤트 추가

! sendPosition -> 도착 조건 추가(+arrive)
*/