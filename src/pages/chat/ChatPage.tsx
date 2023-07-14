import React, { useEffect, useState } from "react"
import s from './chatPage.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { ActionsChatType, sendMessageTC, startMessagesListiningTC, stopMessagesListiningTC } from "../../redux/chatReducer";
import { getMessages, getStatus } from "../../redux/chatSelector";
import { ThunkDispatch } from 'redux-thunk';
import { AppStateType } from "../../redux/redux";
import { ChatMessageType } from "../../API/chat-api";


const ChatPage: React.FC = () => {

   return (
      <div className={s.wrapper}>
         <Chat />
      </div>
   )
}


const Chat: React.FC = () => {

   const dispatch: ThunkDispatch<AppStateType, undefined, ActionsChatType> = useDispatch();

   useEffect(() => {
      dispatch(startMessagesListiningTC());

      return () => {
         dispatch(stopMessagesListiningTC());
      };
   }, []);



   return (
      <div className={s.chat}>
         <div className={s.chat__messages}>
            <Messages />
         </div>
         <div className={s.chat__messageForm}>
            <AddMessageForm />
         </div>
      </div>
   )
}


const Messages: React.FC = () => {

   const messages = useSelector(getMessages)

   return (
      <div className={s.messages}>
         {messages.map((message, index) => (
            <Message key={index} message={message} />
         ))}
      </div>
   );
};


const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {

   return (
      <div className={s.message}>
         <img src={message.photo} alt="author" />
         <b>{message.userName}</b>
         <div className={s.message__text}>
            {message.message}
         </div>
      </div>
   )
}

const useSendMessageHandler = (): ((message: string) => void) => {
   const dispatch: ThunkDispatch<AppStateType, undefined, ActionsChatType> = useDispatch();
 
   const sendMessageHandler = (message: string) => {
     if (!message) {
       return;
     }
     dispatch(sendMessageTC(message));
   };
 
   return sendMessageHandler;
 };
 
 const AddMessageForm: React.FC = () => {
   const [message, setMessage] = useState('');

   const status = useSelector(getStatus)
      
   const sendMessageHandler = useSendMessageHandler();
 
   const handleClick = () => {
     sendMessageHandler(message);
     setMessage('');
   };
 
   return (
     <div className={s.messageForm}>
       <textarea name="message" onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
       <button disabled={message.length === 0} onClick={handleClick}>Send</button>
     </div>
   );
 };

/* кнопка скрыта пока соединение по каналу не установлено */

export default ChatPage