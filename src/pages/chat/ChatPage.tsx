import React, { CSSProperties, useEffect, useState } from "react"
import s from './chatPage.module.scss'

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
   message: string,
   photo: string,
   userId: number,
   userName: string

}

const ChatPage: React.FC = () => {

   // useEffect(() => {
   //    wsChannel.addEventListener('open', () => {
   //       console.log('WebSocket connection established')
   //    })

   //    wsChannel.addEventListener('error', (error) => {
   //       console.error('WebSocket error:', error)
   //    })

   // }, [])

   return (
      <div className={s.wrapper}>
         <Chat />
      </div>
   )
}


const Chat: React.FC = () => {

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

   const [messages, setMessages] = useState<ChatMessageType[]>([])

   useEffect(() => {
      wsChannel.addEventListener(
         'message', (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
            // setMessages([...messages, ...newMessages])
         }
      )
   }, [])

   // let messages: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

   return (
      <div className={s.messages}>
         {messages.map((message, index) => <Message key={index} message={message} />)}
      </div>
   )
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
   // const message: ChatMessageType = null
   // {
   //    url: 'https://via.placeholder.com/30',
   //    author: 'Stanislav',
   //    text: 'Hello friends'
   // }
   return (
      <div className={s.message}>
         <img src={message.photo} alt="author" />
         <b>{message.userName}</b>
         <br />
         {message.message}
         <hr />
      </div>
   )
}

const AddMessageForm: React.FC = () => {
   const [message, sentMessage] = useState('')

   const sendMessage = () => {
      if (!message) {
         return
      }
      wsChannel.send(message)
      sentMessage('')
   }

   return (
      <div className={s.messageForm}>
         <textarea name='message' onChange={(e) => sentMessage(e.currentTarget.value)} value={message}></textarea>
         <button onClick={sendMessage}>Send</button>
      </div>
   )
}

export default ChatPage