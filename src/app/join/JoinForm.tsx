'use client'

import { useEffect, useState } from 'react';
import { Lock, User, Mail, ArrowRight, Building2 } from 'lucide-react';
import Input from '@/components/TailInput';
import { useRouter } from 'next/navigation';
import TailSelect from '@/components/TailSelect';
import TailButton from '@/components/TailButton';
import { usePasswordMatch } from '@/hooks/usePasswordMatch';
import { useValidationRules } from '@/hooks/useValidationRules';
import { toast } from 'sonner';
import { useJoin } from '@/hooks/useJoin';

export default function JoinForm() {
    const router = useRouter();

    const { handleJoin, handleDuplicate, usernameChecked, setUsernameChecked } = useJoin();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordChk: "",
        alias: "",
        department: ""
    });

    // 비밀번호 유효성 검사
    const passwordMsg = usePasswordMatch(formData.password, formData.passwordChk);
    const { passwordRule, usernameRule } = useValidationRules({ password: formData.password, username: formData.username });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // 아이디를 수정하면 다시 중복확인
        if (name === "username") {
            setUsernameChecked(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 유효성 검사 추가
        if (!usernameChecked)
            return toast.warning("아이디 중복 확인 필요", {
                description: "먼저 아이디 중복 확인을 실시해 주세요.",
            });
        if (formData.password !== formData.passwordChk)
            return toast.error("비밀번호 불일치", {
                description: "입력하신 두 비밀번호가 서로 다릅니다.",
            });

        await handleJoin(formData);
    };

    const checkDuplicate = async () => {
        if (!formData.username) {
            toast.error("아이디를 먼저 입력해 주세요.");
            return;
        }

        if (usernameRule !== "") {
            setUsernameChecked(false);
            toast.error("아이디 형식이 올바르지 않습니다.");
            return;
        }

        toast.promise(handleDuplicate(formData), {
            loading: "아이디 확인 중...",
            success: "사용 가능한 아이디입니다!",
            error: "이미 사용 중인 아이디입니다."
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 사원 정보 */}
                <div className="space-y-3">
                    <p className="text-[11px] text-sky-600 font-bold uppercase tracking-wider ml-1">사원 정보</p>
                    {/* 성명 */}
                    <Input icon={User} placeholder="성함" name="alias" value={formData.alias} onChange={handleChange} />
                    {/* 부서 선택 */}
                    <TailSelect icon={Building2} name="department" value={formData.department} onChange={handleChange}
                        option=
                        {
                            <>
                                <option value="" disabled>부서 선택</option>
                                <option value="정수운영팀" className="text-slate-800">정수운영팀</option>
                                <option value="배수운영팀" className="text-slate-800">배수운영팀</option>
                            </>
                        } />
                </div>

                {/* 로그인 정보 */}
                <div className="space-y-3">
                    <p className="text-[11px] text-sky-600 font-bold uppercase tracking-wider ml-1">로그인 정보</p>
                    {/* 아이디, 비밀번호, 비밀번호 확인 */}
                    <div className="w-full flex items-center gap-2">
                        <div className="flex-1">
                            <Input icon={Mail} placeholder="아이디" name="username" value={formData.username} onChange={handleChange} />
                        </div>
                        <button
                            type="button"
                            className="shrink-0 h-12 px-3.5 bg-slate-500 hover:bg-slate-600 text-white rounded-xl font-semibold text-[11px] md:text-xs shadow-sm transition-all active:scale-[0.96] flex items-center justify-center whitespace-nowrap"
                            onClick={checkDuplicate}
                        >
                            중복확인
                        </button>
                    </div>
                    {usernameRule && (<p className="text-xs text-red-500 ml-2">{usernameRule}</p>)}

                    <Input icon={Lock} type="password" placeholder="비밀번호" name="password" value={formData.password} onChange={handleChange} />
                    {passwordRule && (<p className="text-xs text-red-500 ml-2">{passwordRule}</p>)}

                    <Input icon={Lock} type="password" placeholder="비밀번호 확인" name="passwordChk" value={formData.passwordChk} onChange={handleChange} />
                    {passwordMsg && (
                        <p className={`text-xs ml-2 mt-1 ${formData.password === formData.passwordChk ? 'text-sky-600' : 'text-red-500'}`}>
                            {passwordMsg}
                        </p>
                    )}
                </div>

                <TailButton text="회원가입" icon={ArrowRight} style="bg-sky-500 hover:bg-sky-600" />

                {/* <div className="bg-sky-50/50 rounded-xl p-4 border border-sky-100/50">
                        <p className="text-[11px] leading-relaxed text-center text-slate-500 font-medium">
                            계정 생성 시 관리자의 승인이 필요합니다.<br />
                            승인 완료 후 입력하신 아이디로 로그인이 가능합니다.
                        </p>
                    </div> */}
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-4">
                <span className="text-slate-400 text-sm font-medium">이미 계정이 있으신가요?</span>
                <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-600 hover:text-sky-600 font-bold text-sm transition-all duration-300 border border-transparent hover:border-sky-100"
                >
                    <User className="w-4 h-4" />
                    로그인 화면으로 이동
                </button>
            </div>
        </>
    );
}
