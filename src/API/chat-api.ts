

export type ChatMessageType = {
   message: string,
   photo: string,
   userId: number,
   userName: string
}

type SubscriberType = (messages: ChatMessageType[]) => void

let ws: WebSocket | null


const createChannel = () => {
   cleanUp()
   ws?.close()
   ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
   ws.addEventListener("close", closeHendler);
   ws.addEventListener('message', messageHendler)
}

const messageHendler = (e: MessageEvent) => {
   const newMessages: ChatMessageType[] = JSON.parse(e.data);
   subscribers.forEach((s) => s(newMessages))
}

const closeHendler = () => {
   setTimeout(createChannel, 3000);
}

const cleanUp = () => {
   ws?.removeEventListener('close', closeHendler)
   ws?.removeEventListener('message', messageHendler)
}

let subscribers = [] as SubscriberType[]

export const chatAPI = {
   subscribe(callback: SubscriberType) {
      subscribers.push(callback)
   },
   unsubscribe(callback: SubscriberType) {
      subscribers = subscribers.filter(s => s !== callback)
   },
   sendMessage(message: string) {
      ws?.send(message)
   },
   start() {
      createChannel()
   },
   stop() {
      subscribers = []
      cleanUp()
      ws?.close()
   }
}











