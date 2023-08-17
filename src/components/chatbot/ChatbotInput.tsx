import React, { useMemo, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { chatBotClicked } from "../../recoil/atoms/clicked";
import BotChat from "../chatbot/chat/BotChat";
import UserChat from "../chatbot/chat/UserChat";
import { useGetChatMessages } from "../../hooks/useChat";
import theme from "../../styles/theme";
export interface ChatData {
  type: "assistant" | "user";
  message: string;
}
const Wrap = styled.div`
  height: 4rem;
  display: grid;
  grid-template-columns: 4fr 1fr;
  border-bottom-right-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
  border: 2px solid ${theme.colors["--border-gray"]};
  background: ${theme.colors["--border-gray"]};
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Input = styled.input`
  width: 16rem;
  height: 2rem;
  margin: 0.5rem;
  border: 2px solid ${theme.colors["--border-gray"]};
  background: ${theme.colors["--border-gray"]};
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Send = styled.button`
  width: 4rem;
  height: 2rem;
  margin-top: 0.7rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 2px solid ${theme.colors["white"]};
  background: ${theme.colors["white"]};
  color: #212121;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  transition: background-color 0.1s, color 0.1s;

  &:hover {
    background-color: ${theme.colors["main-color"]};
    color: white;
  }
`;

export default function ChatbotInput() {
  const [clicked, setClicked] = useRecoilState<boolean>(chatBotClicked);
  const [userInputValue, setUserInputValue] = useState<string>("");
  const { handleUserInput, isLoading, isError, messages } = useGetChatMessages(
    userInputValue,
    setUserInputValue
  );
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const handleSendMessage = () => {
    if (userInputValue.trim() !== "") {
      setUserMessages((prevMessages) => [...prevMessages, userInputValue]);
      setUserInputValue("");
    }
  };

  const useMemoMessage = useMemo(() => {
    const allMessages = [
      ...messages,
      ...userMessages.map((message) => ({ type: "user", message })),
    ];
    return messages.map(({ type, message }: ChatData, index: number) =>
      type === "assistant" ? (
        <BotChat text={message} key={index} />
      ) : (
        <UserChat text={message} key={index} />
      )
    );
  }, [messages, userMessages]);

  return (
    <Wrap>
      <Input
        type="text"
        value={userInputValue}
        onChange={(e) => setUserInputValue(e.target.value)}
        onKeyPress={handleUserInput}
        placeholder="메세지를 입력해주세요."
      />
      <Send onClick={handleSendMessage}>전송</Send>
    </Wrap>
  );
}
