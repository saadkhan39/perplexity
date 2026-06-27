import { io } from "socket.io-client";

export const  initializeSocketConnection=(params)=> {

    const socket = io("https://perplexity-qfgq.onrender.com",{
        withCredentials:true
    });

    socket.on("connect", () => {
    console.log("Connected to socket.io server");
   });
}