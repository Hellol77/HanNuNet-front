import { useState } from "react";
import { chatBotApi } from "./../apis/chatbot";
import { useMutation } from "@tanstack/react-query";

export interface ChatData {
  type: "assistant" | "user";
  message: string;
}

export function useChatBot(
  userMessages: string[],
  assistantMessages: string[]
) {
  return useMutation(async () => chatBotApi(userMessages, assistantMessages), {
    onSuccess: (data) => {
      console.log(data.assistant);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function useGetChatMessages(
  userInputValue: string,
  setUserInputValue: React.Dispatch<React.SetStateAction<string>>
) {
  const [userMessages, setUserMessages] = useState<string[]>([""]);
  const [assistantMessages, setAssistantMessages] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatData[]>([
    {
      type: "assistant",
      message:
        "당신에게 알맞는 전자기기를 추천해드릴게요. 어떤 용도로 사용하시나요",
    },
  ]);

  const { mutateAsync, isLoading, isError } = useChatBot(
    userMessages,
    assistantMessages
  );
  //if문 함수화
  const handleUserSend = () => {
    setUserMessages((prev) => [...prev, userInputValue]);
    setUserInputValue("");
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", message: userInputValue },
    ]);
  };
  const handleUserInput = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleUserSend();

      try {
        // useChatBot 훅에서 반환handleUserSend한 mutateAsync 함수를 사용하여 데이터를 요청하고 처리합니다.
        const response = await mutateAsync();
        setAssistantMessages((prev) => [...prev, response.assistant]);
        setMessages((prevMessage) => [
          ...prevMessage,
          { type: "assistant", message: response.assistant },
        ]);
        // 이후에 서버 응답을 처리하고 화면에 표시할 수 있습니다.
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return { handleUserSend, handleUserInput, isLoading, isError, messages };
}
