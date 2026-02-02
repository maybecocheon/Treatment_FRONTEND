'use client'

import { useEffect, useState } from "react";

interface ValidationProps {
  password?: string;
  username?: string;
}

export function useValidationRules({ password, username }: ValidationProps = {}) {
    const [passwordRule, setPasswordRule] = useState<string>("");
    const [usernameRule, setUsernameRule] = useState<string>("");

    const validationRules = {
        username: (value: string) => {
            const regex = /^[a-z0-9]{5,20}$/;
            return regex.test(value) || "아이디는 영문 소문자와 숫자 조합으로 5~20자여야 합니다.";
        },
        password: (value: string) => {
            const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
            return regex.test(value) || "비밀번호는 영문, 숫자, 특수문자를 포함하여 8~20자여야 합니다.";
        }
    };

    // 비밀번호 검사
    useEffect(() => {
        if (password !== undefined) {
            const result = validationRules.password(password);
            setPasswordRule(password === "" ? "" : (result === true ? "" : result as string));
        }
    }, [password]);

    // 아이디 검사
    useEffect(() => {
        if (username !== undefined) {
            const result = validationRules.username(username);
            setUsernameRule(username === "" ? "" : (result === true ? "" : result as string));
        }
    }, [username]);

    return { passwordRule, usernameRule };
}