import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { selectedConversation, messages, setMessages } = useConversation();
  if (!selectedConversation._id) {
    return;
  }
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      console.log(newMessage, selectedConversation);
      if (newMessage.senderId === selectedConversation._id) {
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        setMessages([...messages, newMessage]);
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages, selectedConversation._id]);
};
export default useListenMessages;
