import { useState, useEffect } from 'react';

export function usePasswordMatch(password: string, confirmPassword: string) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (password ==="" ||confirmPassword === "") {
      setMessage("");
    } else if (password === confirmPassword) {
      setMessage("✅ 비밀번호가 일치합니다.");
    } else {
      setMessage("❌ 비밀번호가 일치하지 않습니다.");
    }
  }, [password, confirmPassword]);

  return message;
}