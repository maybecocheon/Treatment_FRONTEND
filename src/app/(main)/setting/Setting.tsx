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
import { currentUserAtom } from '@/atoms/uniAtoms';


export default function Setting() {
    const router = useRouter();

    // 사용자 정보 상태
    const [currentUserData, setCurrentUserData] = useAtom(currentUserAtom);

    // 비밀번호 변경 관련 상태
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const passwordMsg = usePasswordMatch(currentPassword, currentUserData!.password);
    const confirmPasswordMsg = usePasswordMatch(newPassword, confirmPassword);
    const { passwordRule } = useValidationRules({ password: newPassword });

    // 최근 로그인 시간
    const [lastLogin, setLastLogin] = useState<string>("");

    useEffect(() => {
        // 예: 로컬스토리지나 API에서 호출
        // 로그인하는 순간 저장해야 됨
        localStorage.setItem("lastLoginTime", new Date().toLocaleString());
        const time = localStorage.getItem("lastLoginTime");
        if (time) setLastLogin(time);
    }, []);

    const [nameValue, setNameValue] = useState(currentUserData!.name);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // const { name, value } = e.target;
        // setFormData(prev => ({ ...prev, [name]: value }));
        if (e.target.name === "name") setNameValue(e.target.value);
    }

    const handleClick = () => {
        // 비밀번호 변경
        if (passwordRule === "") setCurrentUserData({ ...currentUserData!, password: newPassword });
        router.push("/");
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 기본 정보 업데이트 로직
        setCurrentUserData({ ...currentUserData!, name: nameValue, department: currentUserData!.department });
    }

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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                {/* 좌측: 프로필 카드 */}
                <div className="lg:col-span-3 h-full">
                    <div className="glass h-full p-8 rounded-[3rem] flex flex-col items-center border border-white/60 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-br from-blue-600/20 to-transparent z-0"></div>

                        <div className="relative z-10 flex flex-col items-center flex-1 w-full">
                            <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl mb-6 border-4 border-white mt-4">
                                <User size={64} />
                            </div>
                            <h3 className="text-2xl font-black text-blue-950">{currentUserData!.name}</h3>
                            <p className="text-sm font-bold text-blue-900/40 uppercase tracking-widest mt-1">{currentUserData!.department}</p>

                            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50/80 rounded-xl text-blue-900 border border-blue-100/50 mt-6">
                                <Shield size={14} className="text-blue-500" />
                                <span className="text-[10px] font-black uppercase tracking-wider">최고 관리자 권한</span>
                            </div>

                            <div className="flex-1"></div>
                            <div className="w-full h-px bg-blue-900/5 my-8"></div>

                            {/* 프로필 하단 */}
                            <div className="w-full space-y-6">
                                <div className="space-y-3">
                                    <h5 className="text-[11px] font-black text-blue-900/30 uppercase tracking-widest flex items-center gap-2">
                                        <Clock size={12} /> 최근 활동
                                    </h5>
                                    <div className="bg-white/40 p-4 rounded-2xl border border-white/40">
                                        <p className="text-xs font-bold text-blue-950">마지막 로그인</p>
                                        <p className="text-[10px] text-blue-900/50 font-medium mt-1">{lastLogin}</p>
                                    </div>
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
                                <h4 className="text-xl font-black text-blue-950">기본 정보 설정</h4>
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
                                    name="id"
                                    value={currentUserData!.id}
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
                                    name="name"
                                    value={nameValue}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2 mb-8">
                                <label className="text-[11px] font-black text-blue-900/40 uppercase tracking-widest flex items-center gap-2 ml-1">
                                    소속 부서
                                </label>
                                <TailSelect />
                            </div>
                        </div>

                        {/* 하단 버튼 */}
                        <TailButton text="기본 정보 업데이트" icon={Save} style="bg-sky-500 hover:bg-sky-600" />
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
                                    name="currentPassword"
                                    onChange={(e) => setCurrentPassword(e.target.value)} />
                                {passwordMsg && (
                                    <p className={`text-xs ml-2 font-medium mt-1 ${currentUserData!.password === currentPassword ? 'text-sky-600' : 'text-red-500'}`}>
                                        {passwordMsg}
                                    </p>
                                )}
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
                                    name="confirmPassword"
                                    onChange={(e) => setConfirmPassword(e.target.value)} />
                                {confirmPasswordMsg && (
                                    <p className={`text-xs ml-2 font-medium mt-1 ${newPassword === confirmPassword ? 'text-sky-600' : 'text-red-500'}`}>
                                        {confirmPasswordMsg}
                                    </p>
                                )}
                            </div>
                        </div>

                        <TailButton text="비밀번호 변경하기" icon={Key} style="bg-amber-500 hover:bg-amber-600" onClick={handleClick} />
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
