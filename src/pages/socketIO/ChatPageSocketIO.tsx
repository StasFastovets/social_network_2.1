import React, { useEffect, useRef, useState } from "react";
import s from './chatPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ActionsChatType, sendMessageTC, startMessagesListiningTC, stopMessagesListiningTC } from "../../redux/chatReducer";
import { getMessages, getStatus } from "../../redux/chatSelector";
import { ChatMessageType } from "../../API/chat-api";
import { io, Socket } from "socket.io-client";
import { AppStateType } from "../../redux/redux";
import { ThunkDispatch } from "redux-thunk";

const ChatPageSocketIO: React.FC = () => {
   return (
      <div className={s.wrapper}>
         <Chat />
      </div>
   )
}

const Chat: React.FC = () => {
   const dispatch: ThunkDispatch<AppStateType, undefined, ActionsChatType> = useDispatch();
   const status = useSelector(getStatus)
   const socketRef = useRef<Socket | null>(null);

   useEffect(() => {
      socketRef.current = io("wss://social-network.samuraijs.com", {
         transports: ["websocket"],
      });

      socketRef.current.on("connect", () => {
         dispatch(startMessagesListiningTC());
      });

      socketRef.current.on("disconnect", () => {
         dispatch(stopMessagesListiningTC());
      });

      return () => {
         if (socketRef.current) {
            socketRef.current.close();
         }
      };
   }, []);

   return (
      <div className={s.chat}>
         {status === 'error' ?
            <div className={s.error}>Some error occurred. Please refresh the page!</div>
            : status === 'pending' ?
               <div className={s.loading}>Loading...</div>
               :
               <>
                  <div className={s.chat__messages}>
                     <Messages socket={socketRef.current} />
                  </div>
                  <div className={s.chat__messageForm}>
                     <AddMessageForm socket={socketRef.current} />
                  </div>
               </>
         }
      </div>
   )
}

const Messages: React.FC<{ socket: Socket | null }> = ({ socket }) => {
   const messages = useSelector(getMessages);
   const messagesRef = useRef<HTMLDivElement>(null);
   const [isAutoScroll, setIsAutoScroll] = useState(true);

   const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const element = e.currentTarget;
      if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
         !isAutoScroll && setIsAutoScroll(true);
      } else {
         isAutoScroll && setIsAutoScroll(false);
      }
   }

   useEffect(() => {
      if (isAutoScroll) {
         messagesRef.current?.scrollIntoView();
      }
   }, [messages]);

   return (
      <div className={s.messages} onScroll={scrollHandler}>
         {messages.map((m) => (
            <Message key={m.id} message={m} />
         ))}
         <div ref={messagesRef}></div>
      </div>
   );
};

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
   return (
      <div className={s.message}>
         <img src={message.photo} alt="author" />
         <b>{message.userName}</b>
         <div className={s.message__text}>
            {message.message}
         </div>
      </div>
   )
});

const useSendMessageHandler = (socket: Socket | null): ((message: string) => void) => {
   const sendMessageHandler = (message: string) => {
      if (socket && message) {
         socket.emit("sendMessage", message);
      }
   };

   return sendMessageHandler;
};

const AddMessageForm: React.FC<{ socket: Socket | null }> = ({ socket }) => {
   const [message, setMessage] = useState('');
   const status = useSelector(getStatus);
   const sendMessageHandler = useSendMessageHandler(socket);

   const handleClick = () => {
      sendMessageHandler(message);
      setMessage('');
   };

   return (
      <div className={s.messageForm}>
         <textarea name="message" onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
         <button disabled={message.length === 0 || status !== 'ready'} onClick={handleClick}>Send</button>
      </div>
   );
};

/* кнопка скрыта пока соединение по каналу не установлено */

export default ChatPageSocketIO;

