'use client'

import React, { useEffect, useState } from 'react';
import Title from '@/components/main/Title';
import { User, Shield, ArrowLeft, Trash2, Key, Lock, Globe, Clock, ShieldIcon, KeyRound, ShieldCheckIcon, Mail, Save } from 'lucide-react';
import TailInput from '@/components/TailInput';
import TailSelect from '@/components/TailSelect';
import TailButton from '@/components/TailButton';
import { usePasswordMatch } from '@/hooks/usePasswordMatch';
import { useValidationRules } from '@/hooks/useValidationRules';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { useUser } from '@/hooks/useUser';
import { myFetch } from '@/app/api/api';


export default function Setting() {
    const router = useRouter();

    // 사용자 정보 상태
    const { profile, loadProfile } = useUser();
    const [formData, setFormData] = useState({ username: "", department: "", alias: "" });

    // 비밀번호 변경 관련 상태
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordRe, setNewPasswordRe] = useState("");

    const confirmPasswordMsg = usePasswordMatch(newPassword, newPasswordRe);
    const { passwordRule } = useValidationRules({ password: newPassword });

    // 최근 로그인 시간
    const [lastLogin, setLastLogin] = useState<string>("");

    useEffect(() => {
        const time = localStorage.getItem("lastLoginTime");
        if (time) setLastLogin(time);
    }, []);

    // 데이터 로드 시 폼 초기화
    useEffect(() => {
        if (profile) {
            setFormData({
                username: profile.username,
                department: profile.department,
                alias: profile.alias
            });
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handlPasswordClick = async () => {
        if (!newPassword) {
            alert("새로운 비밀번호를 입력해 주세요.");
            return;
        }

        if (passwordRule !== "") {
            alert("비밀번호 규칙을 확인해 주세요.");
            return;
        }

        if (newPassword !== newPasswordRe) {
            alert("새 비밀번호가 서로 일치하지 않습니다.");
            return;
        }

        // 비밀번호 변경
        try {
            const response = await fetch("/api/proxy/member/update/password", {
                credentials: "include",
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: password, newPassword: newPassword, newPasswordRe: newPasswordRe }),
            });
            if (response.ok) {
                alert("비밀번호 수정에 성공하셨습니다.");
                loadProfile();
                if (passwordRule === "") setPassword(newPassword);
                router.push("/");
            } else if (response.status === 401) {
                alert("현재 사용 중인 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.");
            } else {
                alert("비밀번호 수정 실패. 다시 시도해 주세요.");
            }
        } catch (error) {
            console.error("비밀번호 수정 오류: ", error);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // 기본 정보 업데이트 로직
        try {
            const response = await myFetch("/api/proxy/member/update/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response && response.ok) {
                alert("회원 정보 수정에 성공하셨습니다.");
                loadProfile();
            } else {
                alert("회원 정보 수정 실패. 다시 시도해 주세요.");
            }
        } catch (error) {
            console.error("회원 정보 수정 오류: ", error);
        }
    }

    if (!profile) return null;

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-2 flex flex-col gap-6" >
            {/* 상단 타이틀 영역 */}
            <div className="flex items-center gap-4 w-full px-2" >
                <button
                    onClick={() => router.back()}
                    className="p-3 glass rounded-2xl hover:bg-white transition-all text-blue-900"
                >
                    <ArrowLeft size={20} />
                </button>
                <Title title="프로필 설정" subtitle="회원 정보 수정 및 탈퇴" />
            </div >

            {/* 좌측: 프로필 카드 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* 좌측: 프로필 카드 */}
                <div className="lg:col-span-4 xl:col-span-3">
                    <div className="glass h-full p-8 rounded-[2.5rem] border border-white/60 shadow-2xl relative overflow-hidden flex flex-col items-center">
                        {/* 아바타 영역 */}
                        <div className="relative mt-6 mb-8">
                            <div className="w-36 h-36 bg-linear-to-tr from-blue-600 to-sky-400 rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white">
                                <User size={72} strokeWidth={1.5} />
                            </div>
                            <div className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg text-blue-600">
                                <Shield size={16} fill="currentColor" fillOpacity={0.2} />
                            </div>
                        </div>

                        {/* 텍스트 영역 */}
                        <div className="text-center space-y-2 mb-10">
                            <h3 className="text-3xl font-black text-blue-950 tracking-tight">{profile.alias}</h3>
                            <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-wide">
                                {profile.department}
                            </div>
                            <p className="text-sm text-blue-900/40 font-medium">ID: {profile.username}</p>
                        </div>

                        {/* 하단 활동 정보 */}
                        <div className="w-full mt-auto">
                            <div className="bg-slate-200/50 backdrop-blur-sm rounded-3xl p-5 border border-white/40 shadow-inner">
                                <div className="flex items-center gap-2 mb-3">
                                    <Clock size={14} className="text-blue-400" />
                                    <span className="text-[11px] font-black text-blue-900/50 uppercase tracking-widest">최근 활동</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] text-blue-900/40 font-bold uppercase">마지막 로그인</p>
                                    <p className="text-sm font-semibold text-blue-950 tracking-tight">{lastLogin || "정보 없음"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 우측: 메인 설정 영역 */}
                <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

                    {/* 기본 정보 수정 섹션 */}
                    <form className="glass p-10 rounded-[3rem] flex flex-col" onSubmit={handleSubmit}>
                        {/* 상단 헤더 */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shadow-sm">
                                <Globe size={20} />
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-blue-950">기본 정보 수정</h4>
                                <p className="text-xs font-bold text-blue-900/30 uppercase tracking-tighter">Profile Information</p>
                            </div>
                        </div>

                        {/* 기본 정보 수정 영역 */}
                        <div className="space-y-6 flex-1">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-blue-900/40 uppercase tracking-widest flex items-center gap-2 ml-1">
                                    아이디
                                </label>
                                <TailInput
                                    icon={Mail}
                                    type="text"
                                    name="username"
                                    value={formData.username || ""}
                                    disabled={true}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-blue-900/40 uppercase tracking-widest flex items-center gap-2 ml-1">
                                    사용자 이름
                                </label>
                                <TailInput
                                    icon={User}
                                    type="text"
                                    name="alias"
                                    value={formData.alias || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2 mb-8">
                                <label className="text-[11px] font-black text-blue-900/40 uppercase tracking-widest flex items-center gap-2 ml-1">
                                    소속 부서
                                </label>
                                <TailSelect value={formData.department || ""} onChange={handleChange} />
                            </div>
                        </div>

                        {/* 하단 버튼 */}
                        <TailButton text="정보 수정하기" icon={Save} style="bg-sky-500 hover:bg-sky-600" />
                    </form>

                    {/* 비밀번호 변경 섹션 */}
                    <div className="glass p-10 rounded-[3rem] flex flex-col">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-amber-50 rounded-2xl text-amber-600 shadow-sm">
                                <Lock size={20} />
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-blue-950">비밀번호 변경</h4>
                                <p className="text-xs font-bold text-blue-900/30 uppercase tracking-tighter">Security Credentials</p>
                            </div>
                        </div>

                        <div className="space-y-6 flex-1">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-blue-900/40 uppercase tracking-widest flex items-center gap-2 ml-1">
                                    현재 비밀번호
                                </label>
                                <TailInput
                                    icon={ShieldIcon}
                                    type="password"
                                    placeholder="현재 비밀번호 입력"
                                    name="password"
                                    value={password || ""}
                                    onChange={(e) => setPassword(e.target.value)}
                                 />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-blue-900/40 uppercase tracking-widest flex items-center gap-2 ml-1">
                                    새 비밀번호
                                </label>
                                <TailInput
                                    icon={KeyRound}
                                    type="password"
                                    placeholder="새로운 비밀번호 입력"
                                    name="newPassword"
                                    value={newPassword || ""}
                                    onChange={(e) => setNewPassword(e.target.value)} />
                                {passwordRule && (<p className="text-xs text-red-500 ml-2 font-medium">{passwordRule}</p>)}
                            </div>
                            <div className="space-y-2 mb-8">
                                <label className="text-[11px] font-black text-blue-900/40 uppercase tracking-widest flex items-center gap-2 ml-1">
                                    비밀번호 확인
                                </label>
                                <TailInput
                                    icon={ShieldCheckIcon}
                                    type="password"
                                    placeholder="비밀번호 재입력"
                                    name="newPasswordRe"
                                    value={newPasswordRe || ""}
                                    onChange={(e) => setNewPasswordRe(e.target.value)} />
                                {confirmPasswordMsg && (
                                    <p className={`text-xs ml-2 font-medium mt-1 ${newPassword === newPasswordRe ? 'text-sky-600' : 'text-red-500'}`}>
                                        {confirmPasswordMsg}
                                    </p>
                                )}
                            </div>
                        </div>

                        <TailButton text="비밀번호 변경하기" icon={Key} style="bg-amber-500 hover:bg-amber-600" onClick={handlPasswordClick} />
                    </div>
                </div>
            </div>

            {/* 회원 탈퇴 */}
            <div className="mt-8 px-4">
                <button className="flex items-center gap-4 group transition-all opacity-40 hover:opacity-100">
                    <div className="p-2 bg-red-100 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-all">
                        <Trash2 size={16} />
                    </div>
                    <div className="text-left">
                        <h4 className="text-xs font-black text-red-950">회원 탈퇴</h4>
                        <p className="text-[9px] font-bold text-red-900/40 uppercase">Account Deletion</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
