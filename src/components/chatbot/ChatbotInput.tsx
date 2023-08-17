import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import theme from "../../styles/theme";

const Wrap = styled.div`
  height: 4rem;
  display: grid;
  grid-template-columns: 4fr 1fr;
  border-bottom-right-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
  border: 2px solid ${theme.colors["--border-gray"]};
  background: ${theme.colors["white"]};
`;

const Input = styled.input`
  width: 16rem;
  height: 2rem;
  margin: 0.5rem;
  border: 2px solid ${theme.colors["white"]};
  background: ${theme.colors["white"]};
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
  border: 2px solid ${theme.colors["--border-gray"]};
  background: ${theme.colors["--border-gray"]};
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
interface InputProps {
  userInputValue: string;
  setUserInputValue: (value: string) => void;
  handleUserInput: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  //onClick
  handleUserSend: () => void;

  placeholder: string;
  isloading: boolean;
}

export default function ChatbotInput({
  userInputValue,
  setUserInputValue,
  handleUserInput,
  placeholder,
  isloading,
  handleUserSend,
}: InputProps) {
  return (
    <Wrap>
      <Input
        type="text"
        value={userInputValue}
        onChange={(e) => setUserInputValue(e.target.value)}
        onKeyPress={handleUserInput}
        placeholder={placeholder}
        disabled={isloading}
      />
      <Send disabled={isloading} onClick={handleUserSend}>
        전송
      </Send>
    </Wrap>
  );
}
