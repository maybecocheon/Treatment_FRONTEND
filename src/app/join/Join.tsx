'use client'

import { useState } from 'react';
import { Lock, User, Mail, ArrowRight, Building2 } from 'lucide-react';
import Background from '@/components/loginJoin/Background';
import Logo from '@/components/loginJoin/Logo';
import Input from '@/components/TailInput';
import { useRouter } from 'next/navigation';
import TailSelect from '@/components/TailSelect';
import TailButton from '@/components/TailButton';
import { usePasswordMatch } from '@/hooks/usePasswordMatch';
import { useValidationRules } from '@/hooks/useValidationRules';
import { toast } from 'sonner';

export default function Join() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordChk: "",
        alias: "",
        department: ""
    });

    // 아이디 중복 확인, 비밀번호 유효성 검사
    const [usernameChecked, setUsernameChecked] = useState<boolean>(false);
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

        try {
            const response = await fetch("/api/proxy/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                toast.success("회원가입 성공", {
                    description: "로그인 후 서비스를 이용하실 수 있습니다."
                });
                router.push("/");
            } else {
                toast.error("회원가입 실패", {
                    description: "정보를 다시 확인하거나 잠시 후 시도해 주세요."
                });
            }
        } catch (error) {
            toast.error("회원가입 오류", {
                description: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
            });
        }
    };

    const handleDuplicate = async () => {
        if (!formData.username) {
            toast.error("아이디를 먼저 입력해 주세요.");
            return;
        }

        const checkUsername = async () => {
            const response = await fetch(`/api/proxy/member/check/${formData.username}`);

            if (!response.ok) {
                setUsernameChecked(false);
                throw new Error("중복");
            }

            if (usernameRule !== "") {
                setUsernameChecked(false);
                throw new Error("유효성");
            }

            setUsernameChecked(true);
            return response;
        };

        toast.promise(checkUsername(), {
            loading: "아이디 확인 중...",
            success: "사용 가능한 아이디입니다!",
            error: (err) => {
                if (err.message === "유효성") return "아이디 형식이 올바르지 않습니다.";
                return "이미 사용 중인 아이디입니다.";
            },
        });
    };

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-auto bg-slate-50 py-5">
            {/* 배경 */}
            <Background />

            {/* 회원가입 박스 */}
            <div className="relative z-10 w-full max-w-md mx-6 p-8 md:p-10 rounded-[2.5rem] bg-white/70 backdrop-blur-3xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.05)] animate-in fade-in zoom-in-95 duration-700">

                <div className="flex flex-col items-center mb-8">
                    {/* 로고  */}
                    <div className="h-30 flex items-baseline justify-center overflow-hidden p-4 mb-4">
                        <Logo scale={0.45} />
                    </div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                        계정 생성
                    </h1>
                </div>

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
                                onClick={handleDuplicate}
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
            </div>
        </section>
    );
}