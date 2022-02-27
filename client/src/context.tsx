import { createContext } from "react";
import url from './url';
import { io, Socket } from 'socket.io-client';

interface ServerToClientEvents {
connection: () => void;
login: (a: string) => void;
logout: (b: string) => void;
createRoom: (a: string) => void;
inviteId: (b: string) => void;
thisUser: (c: string) => void;
error: (error: string) => void;
getPosition: (data: object) => void;
}

interface ClientToServerEvents {
login: (user: object) => void;
logout: (user: object) => void;
createRoom: (id: object) => void;
inviteId: (inviteList: object) => void;
thisUser: (a:string) => void;
getPosition: (data: object) => void;
}
    
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(url, {
    withCredentials: true
    });

export const SocketContext = createContext<Socket | null>(socket);

