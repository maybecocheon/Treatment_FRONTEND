// 유효성 검사 규칙
export const validationRules = {
    // 아이디: 영문 소문자, 숫자 조합 / 5~20자
    username: (value: any) => {
        const regex = /^[a-z0-9]{5,20}$/;
        return regex.test(value) || "아이디는 영문 소문자와 숫자 조합으로 5~20자여야 합니다."
    },
    // 비밀번호: 영문, 숫자, 특수문자 포함 / 8~20자
    password: (value: any) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
        return regex.test(value) || "비밀번호는 영문, 숫자, 특수문자를 포함하여 8~20자여야 합니다."
    }
}

// 중복 확인
// export const checkDuplicate = async (type: string) => {
//     const value = (type === 'username') ? formData.username : formData.alias;
//     const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
//     if (!value) return alert(`${type === 'username' ? '아이디' : '닉네임'}를 입력해주세요.`);

//     try {
//         const response = await fetch(`${serverUrl}/api/check-duplicate?type=${type}&value=${value}`);
//         if (response.ok) {
//             if (type === 'username') {
//                 setUsernameChecked(true);
//                 setUsernameStatus('success');
//             }
//             if (type === 'alias') {
//                 setAliasChecked(true);
//                 setAliasStatus('success');
//             }
//         } else {
//             if (type === 'username') {
//                 setUsernameStatus('error');
//             }
//             if (type === 'alias') {
//                 setAliasStatus('error');
//             }
//         }
//     } catch (error) {
//         alert("연결 오류가 발생했습니다.");
//     }
// }