import { StatusType } from "../redux/chatReducer"


export type ChatMessageAPIType = {
   message: string,
   photo: string,
   userId: number,
   userName: string
}

export type ChatMessageType = ChatMessageAPIType & {id: string}

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

type eventsNamesType = 'messages-recieved' | 'status-changed'

let ws: WebSocket | null

const notifySubscribersAboutStatus = (status: StatusType) => subscribersStatus.forEach(s => s(status))

const createChannel = () => {
   cleanUp()
   ws?.close()
   ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
   notifySubscribersAboutStatus('pending')
   ws.addEventListener("close", closeHendler);
   ws.addEventListener('message', messageHendler)
   ws.addEventListener('open', openHendler)
   ws.addEventListener('error', errorHendler)
}

const messageHendler = (e: MessageEvent) => {
   const newMessages: ChatMessageType[] = JSON.parse(e.data);
   subscribersMessages.forEach((s) => s(newMessages))
}

const openHendler = () => {
   notifySubscribersAboutStatus('ready')
}

const errorHendler = () => {
   notifySubscribersAboutStatus('error')
   console.error('REFRESH PAGE')
}

const closeHendler = () => {
   notifySubscribersAboutStatus('pending')
   setTimeout(createChannel, 3000);
}

const cleanUp = () => {
   ws?.removeEventListener('close', closeHendler)
   ws?.removeEventListener('message', messageHendler)
   ws?.removeEventListener('open', openHendler)
   ws?.removeEventListener('error', errorHendler)
}

let subscribersMessages = [] as MessagesReceivedSubscriberType[]
let subscribersStatus = [] as StatusChangedSubscriberType[]

export const chatAPI = {
   subscribeMessage(callback: MessagesReceivedSubscriberType) {
      subscribersMessages.push(callback);
   },
   unsubscribeMessage(callback: MessagesReceivedSubscriberType) {
      subscribersMessages = subscribersMessages.filter((s) => s !== callback);
   },
   subscribeStatus(callback: StatusChangedSubscriberType) {
      subscribersStatus.push(callback);
   },
   unsubscribeStatus(callback: StatusChangedSubscriberType) {
      subscribersStatus = subscribersStatus.filter((s) => s !== callback);
   },
   sendMessage(message: string) {
      ws?.send(message)
   },
   start() {
      createChannel()
   },
   stop() {
      subscribersMessages = []
      subscribersStatus = []
      cleanUp()
      ws?.close()
   }
}











