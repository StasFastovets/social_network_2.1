import React, { CSSProperties, useEffect, useState } from "react"
import s from './chatPage.module.scss'


export type ChatMessageType = {
   message: string,
   photo: string,
   userId: number,
   userName: string

}

const ChatPage: React.FC = () => {

   return (
      <div className={s.wrapper}>
         <Chat />
      </div>
   )
}


const Chat: React.FC = () => {

   const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

   // useEffect(() => {
   //    function createChannel() {
   //       let ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
   //       wsChannel?.addEventListener('close', () => {
   //          setTimeout(createChannel, 3000)
   //       })
   //       setWsChannel(ws)
   //    }
   //    createChannel()
   // }, [])

   useEffect(() => {
      createChannel();

      return () => {
         if (wsChannel) {
            wsChannel.close();
         }
      };
   }, []);

   const createChannel = () => {
      const ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
      ws.addEventListener("close", () => {
         setTimeout(createChannel, 3000);
      });
      setWsChannel(ws);
   };

   return (
      <div className={s.chat}>
         <div className={s.chat__messages}>
            <Messages wsChannel={wsChannel} />
         </div>
         <div className={s.chat__messageForm}>
            <AddMessageForm wsChannel={wsChannel} />
         </div>
      </div>
   )
}


const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
   const [messages, setMessages] = useState<ChatMessageType[]>([]);

   useEffect(() => {
      const handleMessage = (e: MessageEvent) => {
         const newMessages = JSON.parse(e.data);
         setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      };

      wsChannel?.addEventListener('message', handleMessage);

      return () => {
         wsChannel?.removeEventListener('message', handleMessage);
      };
   }, [wsChannel]);

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

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
   const [message, sentMessage] = useState('')
   const [readyStatus, setReadyStatus] = useState<'pending' | 'open'>('pending')


   useEffect(() => {
      wsChannel?.addEventListener('open', () => setReadyStatus('open'))
   }, [wsChannel])

   const sendMessage = () => {
      if (!message) {
         return
      }
      wsChannel?.send(message)
      sentMessage('')
   }

   return (
      <div className={s.messageForm}>
         <textarea name='message' onChange={(e) => sentMessage(e.currentTarget.value)} value={message}></textarea>
         <button disabled={wsChannel == null || readyStatus !== 'open'} onClick={sendMessage}>Send</button>
      </div>
   )
}

/* кнопка скрыта пока соединение по каналу не установлено */

export default ChatPage