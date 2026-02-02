
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